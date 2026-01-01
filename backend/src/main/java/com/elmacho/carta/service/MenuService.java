package com.elmacho.carta.service;

import com.elmacho.carta.dto.*;
import com.elmacho.carta.entity.*;
import com.elmacho.carta.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la carta pública (sin autenticación)
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MenuService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductOptionRepository optionRepository;

    @Value("${app.restaurant.name:El Macho}")
    private String restaurantName;

    @Value("${app.restaurant.slogan:Productos del Mar}")
    private String restaurantSlogan;

    /**
     * Obtiene la carta completa con todas las categorías y productos disponibles
     */
    @Cacheable(value = "menu", key = "#language")
    public MenuResponseDTO getFullMenu(String language) {
        log.info("Obteniendo carta completa en idioma: {}", language);
        
        List<Category> categories = categoryRepository.findByActiveTrueOrderByDisplayOrderAsc();
        
        List<CategoryDTO> categoryDTOs = categories.stream()
                .map(cat -> mapCategoryToDTO(cat, language, true))
                .collect(Collectors.toList());

        List<ProductDTO> featured = productRepository.findFeaturedWithOptions().stream()
                .map(p -> mapProductToDTO(p, language))
                .collect(Collectors.toList());

        List<ProductDTO> catchOfDay = productRepository.findCatchOfDayWithOptions().stream()
                .map(p -> mapProductToDTO(p, language))
                .collect(Collectors.toList());

        return MenuResponseDTO.builder()
                .restaurantName(restaurantName)
                .slogan(restaurantSlogan)
                .language(language)
                .categories(categoryDTOs)
                .featuredProducts(featured)
                .catchOfDay(catchOfDay)
                .build();
    }

    /**
     * Obtiene productos de una categoría específica
     */
    @Cacheable(value = "category-products", key = "#categoryCode + '-' + #language")
    public CategoryDTO getProductsByCategory(String categoryCode, String language) {
        log.info("Obteniendo productos de categoría {} en idioma: {}", categoryCode, language);
        
        Category category = categoryRepository.findByCode(categoryCode)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada: " + categoryCode));
        
        return mapCategoryToDTO(category, language, true);
    }

    /**
     * Obtiene solo productos disponibles (para actualización en tiempo real)
     */
    public List<ProductDTO> getAvailableProducts(String language) {
        log.info("Obteniendo productos disponibles en idioma: {}", language);
        
        return productRepository.findAllAvailableWithOptionsAndTags().stream()
                .map(p -> mapProductToDTO(p, language))
                .collect(Collectors.toList());
    }

    /**
     * Obtiene productos destacados
     */
    @Cacheable(value = "featured-products", key = "#language")
    public List<ProductDTO> getFeaturedProducts(String language) {
        return productRepository.findFeaturedWithOptions().stream()
                .map(p -> mapProductToDTO(p, language))
                .collect(Collectors.toList());
    }

    /**
     * Obtiene la pesca del día
     */
    public List<ProductDTO> getCatchOfDay(String language) {
        return productRepository.findCatchOfDayWithOptions().stream()
                .map(p -> mapProductToDTO(p, language))
                .collect(Collectors.toList());
    }

    // ============== MAPPERS ==============

    private CategoryDTO mapCategoryToDTO(Category category, String language, boolean includeProducts) {
        List<ProductDTO> products = null;
        int productCount = 0;

        if (includeProducts) {
            List<Product> availableProducts = category.getProducts().stream()
                    .filter(p -> p.getActive() && p.getAvailable())
                    .sorted(Comparator.comparing(Product::getDisplayOrder))
                    .collect(Collectors.toList());
            
            products = availableProducts.stream()
                    .map(p -> mapProductToDTO(p, language))
                    .collect(Collectors.toList());
            
            productCount = products.size();
        }

        return CategoryDTO.builder()
                .id(category.getId())
                .code(category.getCode())
                .name(category.getName(language))
                .description(category.getDescription(language))
                .iconUrl(category.getIconUrl())
                .imageUrl(category.getImageUrl())
                .displayOrder(category.getDisplayOrder())
                .products(products)
                .productCount(productCount)
                .build();
    }

    private ProductDTO mapProductToDTO(Product product, String language) {
        List<ProductOption> availableOptions = product.getOptions().stream()
                .filter(o -> o.getActive() && o.getAvailable())
                .sorted(Comparator.comparing(ProductOption::getDisplayOrder))
                .collect(Collectors.toList());

        List<ProductOptionDTO> optionDTOs = availableOptions.stream()
                .map(o -> mapOptionToDTO(o, language))
                .collect(Collectors.toList());

        List<TagDTO> tagDTOs = product.getTags().stream()
                .filter(t -> t.getTagDefinition().getActive())
                .sorted(Comparator.comparing(t -> t.getDisplayOrder() != null ? t.getDisplayOrder() : 0))
                .map(t -> mapTagToDTO(t.getTagDefinition(), language))
                .collect(Collectors.toList());

        // Precio desde (menor precio disponible)
        BigDecimal priceFrom = availableOptions.stream()
                .map(ProductOption::getPrice)
                .min(BigDecimal::compareTo)
                .orElse(null);

        return ProductDTO.builder()
                .id(product.getId())
                .code(product.getCode())
                .name(product.getName(language))
                .description(product.getDescription(language))
                .imageUrl(product.getImageUrl())
                .categoryCode(product.getCategory().getCode())
                .categoryName(product.getCategory().getName(language))
                .displayOrder(product.getDisplayOrder())
                .featured(product.getFeatured())
                .recommended(product.getRecommended())
                .catchOfDay(product.getCatchOfDay())
                .spicyLevel(product.getSpicyLevel())
                .allergens(product.getAllergens(language))
                .priceFrom(priceFrom)
                .options(optionDTOs)
                .tags(tagDTOs)
                .build();
    }

    private ProductOptionDTO mapOptionToDTO(ProductOption option, String language) {
        return ProductOptionDTO.builder()
                .id(option.getId())
                .name(option.getName(language))
                .description(option.getDescription(language))
                .price(option.getPrice())
                .originalPrice(option.getOriginalPrice())
                .hasDiscount(option.hasDiscount())
                .discountPercentage(option.getDiscountPercentage())
                .optionType(option.getOptionType().name())
                .servesPeople(option.getServesPeople())
                .sizeCode(option.getSizeCode())
                .preparationCode(option.getPreparationCode())
                .displayOrder(option.getDisplayOrder())
                .isDefault(option.getIsDefault())
                .available(option.getAvailable())
                .build();
    }

    private TagDTO mapTagToDTO(TagDefinition tag, String language) {
        return TagDTO.builder()
                .id(tag.getId())
                .code(tag.getCode())
                .text(tag.getText(language))
                .iconName(tag.getIconName())
                .backgroundColor(tag.getBackgroundColor())
                .textColor(tag.getTextColor())
                .tagType(tag.getTagType().name())
                .build();
    }
}
