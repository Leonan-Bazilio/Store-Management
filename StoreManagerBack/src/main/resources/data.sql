-- Inserir dados na tabela de produtos
INSERT INTO product (name, description, cost_price, selling_price, stock_quantity, intermediate_warning_quantity, alert_quantity, image_path, created_at)
VALUES
    ('Produto 1', 'Descrição do Produto 1', 10.0, 20.0, 100, 20, 10, 'images (1).jpg', CURRENT_TIMESTAMP),
    ('Produto 2', 'Descrição do Produto 2', 15.0, 30.0, 50, 10, 5, 'images (1).jpg', CURRENT_TIMESTAMP),
    ('Produto 3', 'Descrição do Produto 3', 8.0, 16.0, 200, 50, 25, 'diagrama.png', CURRENT_TIMESTAMP),
    ('Produto 4', 'Descrição do Produto 4', 12.0, 24.0, 30, 10, 5, 'diagrama.png', CURRENT_TIMESTAMP),
    ('Produto 5', 'Descrição do Produto 5', 20.0, 40.0, 40, 20, 3, 'feather-967367_640.jpg', CURRENT_TIMESTAMP),
    ('Produto 6', 'Descrição do Produto 5', 20.0, 40.0, 40, 22, 3, 'feather-967367_640.jpg', CURRENT_TIMESTAMP);
