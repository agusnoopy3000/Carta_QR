package com.elmacho.carta.config;

import com.elmacho.carta.entity.*;
import com.elmacho.carta.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final TagDefinitionRepository tagRepository;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("🦐 Cargando carta oficial de El Macho...");
        
        createTags();
        
        Category menuDelMar = createCategory("MENU_DEL_MAR", "Menú del Mar", "Seafood Menu", 
                "Mariscos preparados con técnicas tradicionales", 
                "Seafood prepared with traditional techniques", "🦪", 1);
        
        Category pescados = createCategory("PESCADOS", "Pescados", "Fish",
                "Pescados frescos del día - Incluye: arroz, tomate, ensalada surtida, papas mayo o chilena",
                "Fresh fish - Includes: rice, tomato, mixed salad, potatoes", "🐟", 2);
        
        Category bar = createCategory("BAR", "Bar", "Bar",
                "Cócteles, tragos y cervezas", "Cocktails, drinks and beers", "🍹", 3);
        
        Category bebestibles = createCategory("BEBESTIBLES", "Bebestibles", "Beverages",
                "Bebidas, jugos y aguas", "Soft drinks, juices and water", "🥤", 4);
        
        Category menuNino = createCategory("MENU_NINO", "Menú Niño", "Kids Menu",
                "Especial para los más pequeños", "Special for the little ones", "👶", 5);

        createMenuDelMarProducts(menuDelMar);
        createPescadosProducts(pescados);
        createBarProducts(bar);
        createBebestiblesProducts(bebestibles);
        createMenuNinoProducts(menuNino);

        log.info("✅ Carta de El Macho cargada - ¡Porciones de Macho!");
    }

    private void createTags() {
        createTag("PORCION_ABUNDANTE", "Porción abundante", "Generous portion", "scale", "#10B981", "#FFFFFF", TagType.PORTION);
        createTag("PLATO_GRANDE", "Plato grande", "Large plate", "maximize", "#059669", "#FFFFFF", TagType.PORTION);
        createTag("TAMANO_MACHO", "¡Tamaño Macho!", "Macho Size!", "zap", "#DC2626", "#FFFFFF", TagType.PORTION);
        createTag("PARA_2", "Ideal para 2", "Ideal for 2", "users", "#7C3AED", "#FFFFFF", TagType.SHARING);
        createTag("PARA_4_6", "Para 4-6 personas", "For 4-6 people", "users", "#A855F7", "#FFFFFF", TagType.SHARING);
        createTag("PARA_COMPARTIR", "Para compartir", "To share", "share-2", "#EC4899", "#FFFFFF", TagType.SHARING);
        createTag("MEJOR_VALOR", "Mejor valor", "Best value", "trending-up", "#F59E0B", "#FFFFFF", TagType.VALUE);
        createTag("RECOMENDADO", "Recomendado", "Recommended", "award", "#F97316", "#FFFFFF", TagType.SPECIAL);
        createTag("ESPECIALIDAD", "Especialidad", "Specialty", "home", "#6366F1", "#FFFFFF", TagType.SPECIAL);
        createTag("MAS_PEDIDO", "El más pedido", "Most popular", "flame", "#EF4444", "#FFFFFF", TagType.SPECIAL);
        createTag("4_PREPARACIONES", "4 preparaciones", "4 preparations", "chef-hat", "#14B8A6", "#FFFFFF", TagType.SPECIAL);
    }

    private void createMenuDelMarProducts(Category category) {
        Product ostiones = createProduct("OSTIONES", "Ostiones", "Scallops",
                "Frescos ostiones: pil-pil, parmesano, salsa verde o ajillo",
                "Fresh scallops: pil-pil, parmesan, green sauce or garlic",
                category, 1, true, true, false);
        addOption(ostiones, "Pil-pil", "Pil-pil style", new BigDecimal("21500"), OptionType.PREPARATION, 2, true);
        addOption(ostiones, "Parmesano", "Parmesan", new BigDecimal("21500"), OptionType.PREPARATION, 2, false);
        addOption(ostiones, "Salsa verde", "Green sauce", new BigDecimal("21500"), OptionType.PREPARATION, 2, false);
        addOption(ostiones, "Ajillo", "Garlic style", new BigDecimal("21500"), OptionType.PREPARATION, 2, false);
        addTagToProduct(ostiones, "4_PREPARACIONES");
        addTagToProduct(ostiones, "PARA_2");
        addTagToProduct(ostiones, "RECOMENDADO");
        productRepository.save(ostiones);

        Product machas = createProduct("MACHAS", "Machas", "Razor Clams",
                "Exquisitas machas chilenas: pil-pil, parmesano, salsa verde o ajillo",
                "Chilean razor clams: pil-pil, parmesan, green sauce or garlic",
                category, 2, true, false, false);
        addOption(machas, "Pil-pil", "Pil-pil style", new BigDecimal("19500"), OptionType.PREPARATION, 2, true);
        addOption(machas, "Parmesano", "Parmesan", new BigDecimal("19500"), OptionType.PREPARATION, 2, false);
        addOption(machas, "Salsa verde", "Green sauce", new BigDecimal("19500"), OptionType.PREPARATION, 2, false);
        addOption(machas, "Ajillo", "Garlic style", new BigDecimal("19500"), OptionType.PREPARATION, 2, false);
        addTagToProduct(machas, "4_PREPARACIONES");
        addTagToProduct(machas, "ESPECIALIDAD");
        addTagToProduct(machas, "PARA_2");
        productRepository.save(machas);

        Product camarones = createProduct("CAMARONES", "Camarones", "Shrimp",
                "Camarones premium: pil-pil, parmesano, salsa verde o ajillo",
                "Premium shrimp: pil-pil, parmesan, green sauce or garlic",
                category, 3, true, true, false);
        addOption(camarones, "Pil-pil", "Pil-pil style", new BigDecimal("19500"), OptionType.PREPARATION, 2, true);
        addOption(camarones, "Parmesano", "Parmesan", new BigDecimal("19500"), OptionType.PREPARATION, 2, false);
        addOption(camarones, "Salsa verde", "Green sauce", new BigDecimal("19500"), OptionType.PREPARATION, 2, false);
        addOption(camarones, "Ajillo", "Garlic style", new BigDecimal("19500"), OptionType.PREPARATION, 2, false);
        addTagToProduct(camarones, "4_PREPARACIONES");
        addTagToProduct(camarones, "MAS_PEDIDO");
        addTagToProduct(camarones, "PORCION_ABUNDANTE");
        productRepository.save(camarones);

        Product jardinMar = createProduct("JARDIN_MAR", "Jardín del Mar", "Garden of the Sea",
                "¡El plato estrella! Surtido espectacular de mariscos frescos",
                "The star dish! Spectacular assortment of fresh seafood",
                category, 4, true, true, false);
        addOption(jardinMar, "Fuente completa", "Full platter", new BigDecimal("35000"), OptionType.SIZE, 4, true);
        addTagToProduct(jardinMar, "TAMANO_MACHO");
        addTagToProduct(jardinMar, "PARA_4_6");
        addTagToProduct(jardinMar, "ESPECIALIDAD");
        productRepository.save(jardinMar);

        Product chupe = createProduct("CHUPE_MARISCOS", "Chupe de Mariscos", "Seafood Chupe",
                "Cremoso chupe tradicional con mariscos, gratinado con queso",
                "Creamy traditional chupe with seafood, gratinated with cheese",
                category, 5, true, false, false);
        addOption(chupe, "Porción individual", "Individual portion", new BigDecimal("17900"), OptionType.SIZE, 1, true);
        addTagToProduct(chupe, "PORCION_ABUNDANTE");
        addTagToProduct(chupe, "RECOMENDADO");
        productRepository.save(chupe);

        Product lapa = createProduct("LAPA_REBOSADA", "Lapa Rebosada", "Breaded Limpet",
                "Lapas frescas rebosadas y fritas, crocantes y doradas",
                "Fresh limpets breaded and fried, crispy and golden",
                category, 6, false, false, false);
        addOption(lapa, "Porción", "Portion", new BigDecimal("16900"), OptionType.SIZE, 2, true);
        addTagToProduct(lapa, "PARA_COMPARTIR");
        productRepository.save(lapa);

        Product pastelJaiba = createProduct("PASTEL_JAIBA", "Pastel de Jaiba", "Crab Casserole",
                "Delicioso pastel de jaiba gratinado al horno",
                "Delicious crab casserole baked with cheese",
                category, 7, true, false, false);
        addOption(pastelJaiba, "Porción", "Portion", new BigDecimal("17900"), OptionType.SIZE, 1, true);
        addTagToProduct(pastelJaiba, "ESPECIALIDAD");
        addTagToProduct(pastelJaiba, "PORCION_ABUNDANTE");
        productRepository.save(pastelJaiba);

        Product ceviche = createProduct("CEVICHE", "Ceviche", "Ceviche",
                "Ceviche de pescado fresco marinado en limón",
                "Fresh fish ceviche marinated in lime",
                category, 8, false, false, false);
        addOption(ceviche, "Porción", "Portion", new BigDecimal("11900"), OptionType.SIZE, 1, true);
        addTagToProduct(ceviche, "MEJOR_VALOR");
        productRepository.save(ceviche);

        Product cevicheMixto = createProduct("CEVICHE_MIXTO", "Ceviche Mixto", "Mixed Ceviche",
                "Generoso ceviche con pescado y mariscos",
                "Generous ceviche with fish and seafood",
                category, 9, true, true, false);
        addOption(cevicheMixto, "Porción abundante", "Generous portion", new BigDecimal("18500"), OptionType.SIZE, 2, true);
        addTagToProduct(cevicheMixto, "TAMANO_MACHO");
        addTagToProduct(cevicheMixto, "PARA_2");
        addTagToProduct(cevicheMixto, "MAS_PEDIDO");
        productRepository.save(cevicheMixto);

        Product pailaMarina = createProduct("PAILA_MARINA", "Paila Marina", "Seafood Soup",
                "Tradicional sopa con abundantes mariscos en caldo de mar",
                "Traditional soup with abundant seafood in sea broth",
                category, 10, true, true, false);
        addOption(pailaMarina, "Paila completa", "Full bowl", new BigDecimal("16900"), OptionType.SIZE, 1, true);
        addTagToProduct(pailaMarina, "PORCION_ABUNDANTE");
        addTagToProduct(pailaMarina, "RECOMENDADO");
        addTagToProduct(pailaMarina, "ESPECIALIDAD");
        productRepository.save(pailaMarina);

        Product caldillo = createProduct("CALDILLO_CONGRIO", "Caldillo de Congrio", "Conger Eel Soup",
                "Famoso caldillo con trozo de congrio, papas y verduras",
                "Famous soup with conger eel, potatoes and vegetables",
                category, 11, true, false, false);
        addOption(caldillo, "Caldillo completo", "Full soup", new BigDecimal("16900"), OptionType.SIZE, 1, true);
        addTagToProduct(caldillo, "PLATO_GRANDE");
        addTagToProduct(caldillo, "ESPECIALIDAD");
        productRepository.save(caldillo);
    }

    private void createPescadosProducts(Category category) {
        Product jurel = createProduct("JUREL", "Jurel", "Jack Mackerel",
                "Jurel fresco del día", "Fresh jack mackerel",
                category, 1, false, false, false);
        addOption(jurel, "A la plancha", "Grilled", new BigDecimal("17900"), OptionType.PREPARATION, 1, true);
        addOption(jurel, "Frito", "Fried", new BigDecimal("17900"), OptionType.PREPARATION, 1, false);
        addTagToProduct(jurel, "MEJOR_VALOR");
        productRepository.save(jurel);

        Product merluza = createProduct("MERLUZA", "Merluza", "Hake",
                "Filete de merluza fresca", "Fresh hake fillet",
                category, 2, false, false, false);
        addOption(merluza, "A la plancha", "Grilled", new BigDecimal("17500"), OptionType.PREPARATION, 1, true);
        addOption(merluza, "Frita", "Fried", new BigDecimal("17500"), OptionType.PREPARATION, 1, false);
        addTagToProduct(merluza, "MEJOR_VALOR");
        productRepository.save(merluza);

        Product pezRoca = createProduct("PEZ_ROCA", "Pez de Roca", "Rockfish",
                "Exquisito pez de roca del litoral chileno", "Exquisite Chilean rockfish",
                category, 3, false, false, false);
        addOption(pezRoca, "A la plancha", "Grilled", new BigDecimal("18500"), OptionType.PREPARATION, 1, true);
        addOption(pezRoca, "Frito", "Fried", new BigDecimal("18500"), OptionType.PREPARATION, 1, false);
        productRepository.save(pezRoca);

        Product reineta = createProduct("REINETA", "Reineta", "Bream",
                "Reineta fresca, uno de los pescados más apreciados", "Fresh bream, most appreciated fish",
                category, 4, true, true, false);
        addOption(reineta, "A la plancha", "Grilled", new BigDecimal("22500"), OptionType.PREPARATION, 1, true);
        addOption(reineta, "Frita", "Fried", new BigDecimal("22500"), OptionType.PREPARATION, 1, false);
        addTagToProduct(reineta, "PLATO_GRANDE");
        addTagToProduct(reineta, "RECOMENDADO");
        productRepository.save(reineta);

        Product dorado = createProduct("DORADO", "Dorado", "Mahi-mahi",
                "Dorado fresco de aguas profundas", "Fresh deep water mahi-mahi",
                category, 5, false, false, false);
        addOption(dorado, "A la plancha", "Grilled", new BigDecimal("19500"), OptionType.PREPARATION, 1, true);
        addOption(dorado, "Frito", "Fried", new BigDecimal("19500"), OptionType.PREPARATION, 1, false);
        productRepository.save(dorado);

        Product congrio = createProduct("CONGRIO", "Congrio", "Conger Eel",
                "El rey de los pescados chilenos. Trozo generoso", "The king of Chilean fish",
                category, 6, true, true, false);
        addOption(congrio, "A la plancha", "Grilled", new BigDecimal("22500"), OptionType.PREPARATION, 1, true);
        addOption(congrio, "Frito", "Fried", new BigDecimal("22500"), OptionType.PREPARATION, 1, false);
        addTagToProduct(congrio, "TAMANO_MACHO");
        addTagToProduct(congrio, "ESPECIALIDAD");
        addTagToProduct(congrio, "MAS_PEDIDO");
        productRepository.save(congrio);

        Product albacora = createProduct("ALBACORA", "Albacora", "Swordfish",
                "Albacora fresca, carne firme y sabor intenso", "Fresh swordfish, firm meat",
                category, 7, false, false, false);
        addOption(albacora, "A la plancha", "Grilled", new BigDecimal("17900"), OptionType.PREPARATION, 1, true);
        addOption(albacora, "Frita", "Fried", new BigDecimal("17900"), OptionType.PREPARATION, 1, false);
        addTagToProduct(albacora, "MEJOR_VALOR");
        productRepository.save(albacora);

        Product lenguado = createProduct("LENGUADO", "Lenguado", "Sole",
                "Fino lenguado de textura delicada", "Fine sole with delicate texture",
                category, 8, true, false, false);
        addOption(lenguado, "A la plancha", "Grilled", new BigDecimal("22500"), OptionType.PREPARATION, 1, true);
        addOption(lenguado, "Frito", "Fried", new BigDecimal("22500"), OptionType.PREPARATION, 1, false);
        addTagToProduct(lenguado, "PLATO_GRANDE");
        addTagToProduct(lenguado, "RECOMENDADO");
        productRepository.save(lenguado);

        Product corvina = createProduct("CORVINA", "Corvina", "Corvina",
                "Corvina fresca de carne blanca y suave", "Fresh corvina with white meat",
                category, 9, true, false, false);
        addOption(corvina, "A la plancha", "Grilled", new BigDecimal("22500"), OptionType.PREPARATION, 1, true);
        addOption(corvina, "Frita", "Fried", new BigDecimal("22500"), OptionType.PREPARATION, 1, false);
        addTagToProduct(corvina, "PLATO_GRANDE");
        addTagToProduct(corvina, "PORCION_ABUNDANTE");
        productRepository.save(corvina);
    }

    private void createBarProducts(Category category) {
        Product piscoSour = createProduct("PISCO_SOUR", "Pisco Sour", "Pisco Sour",
                "El clásico cóctel chileno", "The classic Chilean cocktail",
                category, 1, true, false, false);
        addOption(piscoSour, "Copa", "Glass", new BigDecimal("5500"), OptionType.SIZE, 1, true);
        addOption(piscoSour, "Jarra (4-6 copas)", "Pitcher (4-6 glasses)", new BigDecimal("19900"), OptionType.SIZE, 5, false);
        addTagToProduct(piscoSour, "PARA_4_6");
        addTagToProduct(piscoSour, "MAS_PEDIDO");
        productRepository.save(piscoSour);

        Product cerveza = createProduct("CERVEZA", "Cervezas", "Beers",
                "Cervezas nacionales e importadas", "National and imported beers",
                category, 2, false, false, false);
        addOption(cerveza, "Schop 500ml", "Draft 500ml", new BigDecimal("3500"), OptionType.SIZE, 1, true);
        addOption(cerveza, "Botella nacional", "National bottle", new BigDecimal("3000"), OptionType.SIZE, 1, false);
        addOption(cerveza, "Botella importada", "Imported bottle", new BigDecimal("4500"), OptionType.SIZE, 1, false);
        productRepository.save(cerveza);

        Product vinoBlanco = createProduct("VINO_BLANCO", "Vino Blanco", "White Wine",
                "Sauvignon Blanc ideal para mariscos", "Sauvignon Blanc ideal for seafood",
                category, 3, false, false, false);
        addOption(vinoBlanco, "Copa", "Glass", new BigDecimal("4500"), OptionType.SIZE, 1, true);
        addOption(vinoBlanco, "Botella", "Bottle", new BigDecimal("18900"), OptionType.SIZE, 4, false);
        addTagToProduct(vinoBlanco, "MEJOR_VALOR");
        productRepository.save(vinoBlanco);

        Product vinoTinto = createProduct("VINO_TINTO", "Vino Tinto", "Red Wine",
                "Cabernet Sauvignon o Carmenere", "Cabernet Sauvignon or Carmenere",
                category, 4, false, false, false);
        addOption(vinoTinto, "Copa", "Glass", new BigDecimal("4500"), OptionType.SIZE, 1, true);
        addOption(vinoTinto, "Botella", "Bottle", new BigDecimal("18900"), OptionType.SIZE, 4, false);
        productRepository.save(vinoTinto);
    }

    private void createBebestiblesProducts(Category category) {
        Product jugo = createProduct("JUGO_NATURAL", "Jugo Natural", "Fresh Juice",
                "Jugos recién exprimidos", "Freshly squeezed juices",
                category, 1, false, false, false);
        addOption(jugo, "Naranja", "Orange", new BigDecimal("3500"), OptionType.PREPARATION, 1, true);
        addOption(jugo, "Piña", "Pineapple", new BigDecimal("3500"), OptionType.PREPARATION, 1, false);
        productRepository.save(jugo);

        Product limonada = createProduct("LIMONADA", "Limonada", "Lemonade",
                "Refrescante limonada natural", "Refreshing natural lemonade",
                category, 2, false, false, false);
        addOption(limonada, "Vaso", "Glass", new BigDecimal("2500"), OptionType.SIZE, 1, true);
        addOption(limonada, "Jarra 1L", "Pitcher 1L", new BigDecimal("6500"), OptionType.SIZE, 4, false);
        addTagToProduct(limonada, "MEJOR_VALOR");
        productRepository.save(limonada);

        Product bebidas = createProduct("BEBIDAS", "Bebidas", "Soft Drinks",
                "Coca-Cola, Sprite, Fanta", "Coca-Cola, Sprite, Fanta",
                category, 3, false, false, false);
        addOption(bebidas, "Lata 350ml", "Can 350ml", new BigDecimal("2000"), OptionType.SIZE, 1, true);
        addOption(bebidas, "Botella 500ml", "Bottle 500ml", new BigDecimal("2500"), OptionType.SIZE, 1, false);
        productRepository.save(bebidas);

        Product agua = createProduct("AGUA_MINERAL", "Agua Mineral", "Mineral Water",
                "Con o sin gas", "Sparkling or still",
                category, 4, false, false, false);
        addOption(agua, "Sin gas 500ml", "Still 500ml", new BigDecimal("1800"), OptionType.PREPARATION, 1, true);
        addOption(agua, "Con gas 500ml", "Sparkling 500ml", new BigDecimal("1800"), OptionType.PREPARATION, 1, false);
        productRepository.save(agua);
    }

    private void createMenuNinoProducts(Category category) {
        Product pollo = createProduct("POLLO_ASADO_PAPAS", "Pollo Asado con Papas Fritas", "Roasted Chicken with Fries",
                "Delicioso pollo asado acompañado de crujientes papas fritas", 
                "Delicious roasted chicken with crispy fries",
                category, 1, false, false, false);
        addOption(pollo, "Plato", "Plate", new BigDecimal("6900"), OptionType.SIZE, 1, true);
        productRepository.save(pollo);

        Product papas = createProduct("PAPAS_FRITAS", "Porción de Papas Fritas", "French Fries",
                "Crujientes papas fritas para acompañar o compartir", 
                "Crispy french fries to accompany or share",
                category, 2, false, false, false);
        addOption(papas, "Porción Chica", "Small Portion", new BigDecimal("3500"), OptionType.SIZE, 1, true);
        addOption(papas, "Porción Grande", "Large Portion", new BigDecimal("5500"), OptionType.SIZE, 2, false);
        addTagToProduct(papas, "MEJOR_VALOR");
        productRepository.save(papas);
    }

    private TagDefinition createTag(String code, String textEs, String textEn, String icon, String bgColor, String textColor, TagType type) {
        return tagRepository.save(TagDefinition.builder().code(code).textEs(textEs).textEn(textEn).iconName(icon).backgroundColor(bgColor).textColor(textColor).tagType(type).active(true).displayOrder(0).build());
    }

    private Category createCategory(String code, String nameEs, String nameEn, String descEs, String descEn, String icon, int order) {
        return categoryRepository.save(Category.builder().code(code).nameEs(nameEs).nameEn(nameEn).descriptionEs(descEs).descriptionEn(descEn).iconUrl(icon).displayOrder(order).active(true).build());
    }

    private Product createProduct(String code, String nameEs, String nameEn, String descEs, String descEn, Category category, int order, boolean featured, boolean recommended, boolean catchOfDay) {
        return Product.builder().code(code).nameEs(nameEs).nameEn(nameEn).descriptionEs(descEs).descriptionEn(descEn).category(category).displayOrder(order).active(true).available(true).featured(featured).recommended(recommended).catchOfDay(catchOfDay).build();
    }

    private void addOption(Product product, String nameEs, String nameEn, BigDecimal price, OptionType type, int servesPeople, boolean isDefault) {
        ProductOption option = ProductOption.builder().nameEs(nameEs).nameEn(nameEn).price(price).optionType(type).servesPeople(servesPeople).displayOrder(product.getOptions().size()).active(true).available(true).isDefault(isDefault).build();
        product.addOption(option);
    }

    private void addTagToProduct(Product product, String tagCode) {
        tagRepository.findByCode(tagCode).ifPresent(tagDef -> {
            ProductTag productTag = ProductTag.builder().tagDefinition(tagDef).displayOrder(product.getTags().size()).build();
            product.addTag(productTag);
        });
    }
}
