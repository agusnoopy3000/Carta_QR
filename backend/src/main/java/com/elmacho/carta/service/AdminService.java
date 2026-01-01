package com.elmacho.carta.service;

import com.elmacho.carta.dto.admin.*;
import com.elmacho.carta.entity.*;
import com.elmacho.carta.exception.ResourceNotFoundException;
import com.elmacho.carta.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio de administración (protegido)
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AdminService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductOptionRepository optionRepository;
    private final TagDefinitionRepository tagRepository;

    // ============== CATEGORÍAS ==============

    public List<CategoryAdminDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapCategoryToAdminDTO)
                .collect(Collectors.toList());
    }

    public CategoryAdminDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada: " + id));
        return mapCategoryToAdminDTO(category);
    }

    @CacheEvict(value = {"menu", "category-products"}, allEntries = true)
    public CategoryAdminDTO createCategory(CategoryAdminDTO dto) {
        if (categoryRepository.existsByCode(dto.getCode())) {
            throw new IllegalArgumentException("Ya existe una categoría con el código: " + dto.getCode());
        }
        
        Category category = Category.builder()
                .code(dto.getCode())
                .nameEs(dto.getNameEs())
                .nameEn(dto.getNameEn())
                .descriptionEs(dto.getDescriptionEs())
                .descriptionEn(dto.getDescriptionEn())
                .iconUrl(dto.getIconUrl())
                .imageUrl(dto.getImageUrl())
                .displayOrder(dto.getDisplayOrder())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
        
        category = categoryRepository.save(category);
        log.info("Categoría creada: {}", category.getCode());
        return mapCategoryToAdminDTO(category);
    }

    @CacheEvict(value = {"menu", "category-products"}, allEntries = true)
    public CategoryAdminDTO updateCategory(Long id, CategoryAdminDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada: " + id));
        
        category.setNameEs(dto.getNameEs());
        category.setNameEn(dto.getNameEn());
        category.setDescriptionEs(dto.getDescriptionEs());
        category.setDescriptionEn(dto.getDescriptionEn());
        category.setIconUrl(dto.getIconUrl());
        category.setImageUrl(dto.getImageUrl());
        category.setDisplayOrder(dto.getDisplayOrder());
        category.setActive(dto.getActive());
        
        category = categoryRepository.save(category);
        log.info("Categoría actualizada: {}", category.getCode());
        return mapCategoryToAdminDTO(category);
    }

    @CacheEvict(value = {"menu", "category-products"}, allEntries = true)
    public void toggleCategoryActive(Long id, boolean active) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada: " + id));
        category.setActive(active);
        categoryRepository.save(category);
        log.info("Categoría {} {}", category.getCode(), active ? "activada" : "desactivada");
    }

    // ============== PRODUCTOS ==============

    public List<ProductAdminDTO> getAllProducts() {
        return productRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::mapProductToAdminDTO)
                .collect(Collectors.toList());
    }

    public List<ProductAdminDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryIdOrderByDisplayOrderAsc(categoryId).stream()
                .map(this::mapProductToAdminDTO)
                .collect(Collectors.toList());
    }

    public ProductAdminDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id));
        return mapProductToAdminDTO(product);
    }

    @CacheEvict(value = {"menu", "category-products", "featured-products"}, allEntries = true)
    public ProductAdminDTO createProduct(ProductAdminDTO dto) {
        if (productRepository.existsByCode(dto.getCode())) {
            throw new IllegalArgumentException("Ya existe un producto con el código: " + dto.getCode());
        }
        
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada: " + dto.getCategoryId()));
        
        Product product = Product.builder()
                .code(dto.getCode())
                .nameEs(dto.getNameEs())
                .nameEn(dto.getNameEn())
                .descriptionEs(dto.getDescriptionEs())
                .descriptionEn(dto.getDescriptionEn())
                .imageUrl(dto.getImageUrl())
                .category(category)
                .displayOrder(dto.getDisplayOrder())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .available(dto.getAvailable() != null ? dto.getAvailable() : true)
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .recommended(dto.getRecommended() != null ? dto.getRecommended() : false)
                .catchOfDay(dto.getCatchOfDay() != null ? dto.getCatchOfDay() : false)
                .spicyLevel(dto.getSpicyLevel())
                .allergensEs(dto.getAllergensEs())
                .allergensEn(dto.getAllergensEn())
                .build();

        // Agregar opciones
        if (dto.getOptions() != null) {
            for (ProductOptionAdminDTO optDto : dto.getOptions()) {
                ProductOption option = mapAdminDTOToOption(optDto);
                product.addOption(option);
            }
        }

        // Agregar tags
        if (dto.getTagIds() != null) {
            for (Long tagId : dto.getTagIds()) {
                TagDefinition tagDef = tagRepository.findById(tagId)
                        .orElseThrow(() -> new ResourceNotFoundException("Tag no encontrado: " + tagId));
                ProductTag productTag = ProductTag.builder()
                        .tagDefinition(tagDef)
                        .displayOrder(0)
                        .build();
                product.addTag(productTag);
            }
        }

        product = productRepository.save(product);
        log.info("Producto creado: {}", product.getCode());
        return mapProductToAdminDTO(product);
    }

    @CacheEvict(value = {"menu", "category-products", "featured-products"}, allEntries = true)
    public ProductAdminDTO updateProduct(Long id, ProductAdminDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id));
        
        if (dto.getCategoryId() != null && !dto.getCategoryId().equals(product.getCategory().getId())) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada: " + dto.getCategoryId()));
            product.setCategory(category);
        }
        
        product.setNameEs(dto.getNameEs());
        product.setNameEn(dto.getNameEn());
        product.setDescriptionEs(dto.getDescriptionEs());
        product.setDescriptionEn(dto.getDescriptionEn());
        product.setImageUrl(dto.getImageUrl());
        product.setDisplayOrder(dto.getDisplayOrder());
        product.setActive(dto.getActive());
        product.setAvailable(dto.getAvailable());
        product.setFeatured(dto.getFeatured());
        product.setRecommended(dto.getRecommended());
        product.setCatchOfDay(dto.getCatchOfDay());
        product.setSpicyLevel(dto.getSpicyLevel());
        product.setAllergensEs(dto.getAllergensEs());
        product.setAllergensEn(dto.getAllergensEn());
        
        product = productRepository.save(product);
        log.info("Producto actualizado: {}", product.getCode());
        return mapProductToAdminDTO(product);
    }

    @CacheEvict(value = {"menu", "category-products", "featured-products"}, allEntries = true)
    public void toggleProductAvailable(Long id, boolean available) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id));
        product.setAvailable(available);
        productRepository.save(product);
        log.info("Producto {} {}", product.getCode(), available ? "disponible" : "no disponible");
    }

    @CacheEvict(value = {"menu", "category-products", "featured-products"}, allEntries = true)
    public void toggleProductFeatured(Long id, boolean featured) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id));
        product.setFeatured(featured);
        productRepository.save(product);
        log.info("Producto {} {} destacado", product.getCode(), featured ? "marcado como" : "removido de");
    }

    @CacheEvict(value = {"menu", "category-products"}, allEntries = true)
    public void toggleCatchOfDay(Long id, boolean catchOfDay) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id));
        product.setCatchOfDay(catchOfDay);
        productRepository.save(product);
        log.info("Producto {} {} pesca del día", product.getCode(), catchOfDay ? "marcado como" : "removido de");
    }

    // ============== PRECIOS (ACTUALIZACIÓN RÁPIDA) ==============

    @CacheEvict(value = {"menu", "category-products", "featured-products"}, allEntries = true)
    public void quickUpdatePrice(QuickPriceUpdateDTO dto) {
        ProductOption option = optionRepository.findById(dto.getOptionId())
                .orElseThrow(() -> new ResourceNotFoundException("Opción no encontrada: " + dto.getOptionId()));
        
        if (dto.getOriginalPrice() != null) {
            option.setOriginalPrice(dto.getOriginalPrice());
        }
        option.setPrice(dto.getNewPrice());
        optionRepository.save(option);
        
        log.info("Precio actualizado: Opción {} -> ${}", dto.getOptionId(), dto.getNewPrice());
    }

    @CacheEvict(value = {"menu", "category-products", "featured-products"}, allEntries = true)
    public void bulkUpdatePrices(List<QuickPriceUpdateDTO> updates) {
        for (QuickPriceUpdateDTO dto : updates) {
            quickUpdatePrice(dto);
        }
        log.info("Actualización masiva de {} precios completada", updates.size());
    }

    @CacheEvict(value = {"menu", "category-products", "featured-products"}, allEntries = true)
    public void toggleOptionAvailable(Long optionId, boolean available) {
        optionRepository.updateAvailability(optionId, available);
        log.info("Opción {} {}", optionId, available ? "disponible" : "no disponible");
    }

    // ============== MAPPERS ==============

    private CategoryAdminDTO mapCategoryToAdminDTO(Category category) {
        return CategoryAdminDTO.builder()
                .id(category.getId())
                .code(category.getCode())
                .nameEs(category.getNameEs())
                .nameEn(category.getNameEn())
                .descriptionEs(category.getDescriptionEs())
                .descriptionEn(category.getDescriptionEn())
                .iconUrl(category.getIconUrl())
                .imageUrl(category.getImageUrl())
                .displayOrder(category.getDisplayOrder())
                .active(category.getActive())
                .build();
    }

    private ProductAdminDTO mapProductToAdminDTO(Product product) {
        List<ProductOptionAdminDTO> options = product.getOptions().stream()
                .map(this::mapOptionToAdminDTO)
                .collect(Collectors.toList());

        List<Long> tagIds = product.getTags().stream()
                .map(t -> t.getTagDefinition().getId())
                .collect(Collectors.toList());

        return ProductAdminDTO.builder()
                .id(product.getId())
                .code(product.getCode())
                .nameEs(product.getNameEs())
                .nameEn(product.getNameEn())
                .descriptionEs(product.getDescriptionEs())
                .descriptionEn(product.getDescriptionEn())
                .imageUrl(product.getImageUrl())
                .categoryId(product.getCategory().getId())
                .displayOrder(product.getDisplayOrder())
                .active(product.getActive())
                .available(product.getAvailable())
                .featured(product.getFeatured())
                .recommended(product.getRecommended())
                .catchOfDay(product.getCatchOfDay())
                .spicyLevel(product.getSpicyLevel())
                .allergensEs(product.getAllergensEs())
                .allergensEn(product.getAllergensEn())
                .options(options)
                .tagIds(tagIds)
                .build();
    }

    private ProductOptionAdminDTO mapOptionToAdminDTO(ProductOption option) {
        return ProductOptionAdminDTO.builder()
                .id(option.getId())
                .nameEs(option.getNameEs())
                .nameEn(option.getNameEn())
                .descriptionEs(option.getDescriptionEs())
                .descriptionEn(option.getDescriptionEn())
                .price(option.getPrice())
                .originalPrice(option.getOriginalPrice())
                .optionType(option.getOptionType())
                .servesPeople(option.getServesPeople())
                .sizeCode(option.getSizeCode())
                .preparationCode(option.getPreparationCode())
                .displayOrder(option.getDisplayOrder())
                .active(option.getActive())
                .available(option.getAvailable())
                .isDefault(option.getIsDefault())
                .build();
    }

    private ProductOption mapAdminDTOToOption(ProductOptionAdminDTO dto) {
        return ProductOption.builder()
                .nameEs(dto.getNameEs())
                .nameEn(dto.getNameEn())
                .descriptionEs(dto.getDescriptionEs())
                .descriptionEn(dto.getDescriptionEn())
                .price(dto.getPrice())
                .originalPrice(dto.getOriginalPrice())
                .optionType(dto.getOptionType())
                .servesPeople(dto.getServesPeople())
                .sizeCode(dto.getSizeCode())
                .preparationCode(dto.getPreparationCode())
                .displayOrder(dto.getDisplayOrder())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .available(dto.getAvailable() != null ? dto.getAvailable() : true)
                .isDefault(dto.getIsDefault() != null ? dto.getIsDefault() : false)
                .build();
    }
}
