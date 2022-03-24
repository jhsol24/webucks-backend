-- insert categories data
INSERT INTO categories(name)
VALUES
('콜드 브루 커피'),
('브루드 커피'),
('에스프레소'),
('프라푸치노'),
('블렌디드')
;

-- insert products data
INSERT INTO products(korean_name, english_name, category_id)
VALUES
('나이트로 콜드 브루', 'Nitro Cold Brew', 1),
('돌체 콜드 브루', 'Dolce Cold Brew', 1),
('아이스 커피', 'Iced Coffee', 2),
('오늘의 커피', 'Brewed Coffee', 2),
('에스프레소 콘 파나', 'Espresso Con Panna', 3),
('모카 프라푸치노', 'Mocha Frappuccino', 4),
('딸기 딜라이트 요거트 블렌디드', 'Strawberry Delight Yogurt Blended', 5)
;

-- insert products images
INSERT INTO product_images (image_url, product_id)
VALUES
('http://image.co.kr/procut_id_1', 1),
('http://image.co.kr/procut_id_2', 2),
('http://image.co.kr/procut_id_3', 3),
('http://image.co.kr/procut_id_4', 4),
('http://image.co.kr/procut_id_5', 5),
('http://image.co.kr/procut_id_6', 6),
('http://image.co.kr/procut_id_7', 7)
;

-- insert allergies data
INSERT INTO allergies(name)
VALUES
('우유'),
('복숭아'),
('대두'),
('밀'),
('오징어')
;

-- insert product_allergies data
INSERT INTO product_allergies(product_id, allergy_id)
VALUES
(1,1),
(1,2),
(2,1),
(2,3),
(4,1),
(5,4),
(6,1),
(6,4)
;

-- insert nutritions data
INSERT INTO nutritions(product_id, caffein, fat, sugar, sodium)
VALUES
(1, 12, 2, 3, 10),
(2, 10, 5, 24, 23),
(3, 3, 24, 5, 4),
(4, 32, 66, 24, 3),
(5, 12, 27, 17, 1),
(6, 30, 10, 40, 3),
(7, 2 , 5, 32, 2)
;