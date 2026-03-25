-- ══════════════════════════════════════════════════════════════════
--   NOBI CHA POS & Order Management System
--   Database Creation Script  (MySQL 8.0+)
--   Schema Version : 1.0  |  Normalized to 3NF
-- ══════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────
--  0. สร้าง DATABASE
-- ─────────────────────────────────────────
DROP DATABASE IF EXISTS nobicha_pos;
CREATE DATABASE nobicha_pos
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE nobicha_pos;


-- ══════════════════════════════════════════════════════════════════
--  SECTION 1 : MASTER DATA TABLES
-- ══════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────
--  1.1  Employee  (พนักงาน)
-- ─────────────────────────────────────────
CREATE TABLE Employee (
    Employee_ID     VARCHAR(10)     NOT NULL,
    Username        VARCHAR(50)     NOT NULL UNIQUE,
    Password        VARCHAR(255)    NOT NULL,          -- ควร hash ด้วย bcrypt ก่อน insert จริง
    Position        ENUM(
                        'Admin',    -- จัดการระบบ / เมนู / พนักงาน
                        'Staff',    -- แคชเชียร์ รับออเดอร์ ชำระเงิน
                        'Barista',  -- ดูรายการออเดอร์ผ่านหน้าจอ
                        'Manager'   -- ดูรายงานยอดขาย
                    )               NOT NULL,
    Name            VARCHAR(60)     NOT NULL,
    Surname         VARCHAR(60)     NOT NULL,
    Emp_Phone       VARCHAR(15)         NULL,
    Emp_Email       VARCHAR(100)        NULL UNIQUE,
    Is_Active       TINYINT(1)      NOT NULL DEFAULT 1,   -- 1 = ใช้งาน, 0 = ปิดใช้งาน
    Created_At      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_employee PRIMARY KEY (Employee_ID)
) ENGINE=InnoDB COMMENT='ข้อมูลพนักงานทุกตำแหน่ง';


-- ─────────────────────────────────────────
--  1.2  Product  (เมนูเครื่องดื่ม)
-- ─────────────────────────────────────────
CREATE TABLE Product (
    Product_ID      VARCHAR(10)     NOT NULL,
    Product_Name    VARCHAR(100)    NOT NULL,
    Category        ENUM(
                        'iced_tea',
                        'hot_tea',
                        'milk_tea',
                        'matcha',
                        'other'
                    )               NOT NULL,
    Base_Price      DECIMAL(8,2)    NOT NULL CHECK (Base_Price >= 0),
    Cost            DECIMAL(8,2)        NULL CHECK (Cost >= 0),   -- ต้นทุน (ใช้คำนวณกำไร)
    Is_Available    TINYINT(1)      NOT NULL DEFAULT 1,           -- 1 = มีขาย, 0 = หยุดขาย
    Created_At      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Updated_At      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_product PRIMARY KEY (Product_ID)
) ENGINE=InnoDB COMMENT='เมนูเครื่องดื่มและราคาขาย';


-- ─────────────────────────────────────────
--  1.3  Topping  (ท็อปปิ้ง)
-- ─────────────────────────────────────────
CREATE TABLE Topping (
    Topping_ID      VARCHAR(10)     NOT NULL,
    Topping_Name    VARCHAR(80)     NOT NULL,
    Topping_Price   DECIMAL(8,2)    NOT NULL DEFAULT 0.00 CHECK (Topping_Price >= 0),
    Is_Available    TINYINT(1)      NOT NULL DEFAULT 1,
    Created_At      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_topping PRIMARY KEY (Topping_ID)
) ENGINE=InnoDB COMMENT='ท็อปปิ้งและราคาเพิ่มเติม';


-- ─────────────────────────────────────────
--  1.4  Customer  (ลูกค้าสมาชิก)
-- ─────────────────────────────────────────
CREATE TABLE Customer (
    Customer_ID     VARCHAR(10)     NOT NULL,
    Name            VARCHAR(60)     NOT NULL,
    Surname         VARCHAR(60)     NOT NULL,
    Cust_Phone      VARCHAR(15)         NULL UNIQUE,
    Cust_Email      VARCHAR(100)        NULL UNIQUE,
    Join_Date       DATE            NOT NULL DEFAULT (CURRENT_DATE),
    Total_Points    INT             NOT NULL DEFAULT 0 CHECK (Total_Points >= 0),
    Created_At      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_customer PRIMARY KEY (Customer_ID)
) ENGINE=InnoDB COMMENT='ข้อมูลลูกค้าสมาชิก (walk-in ไม่ต้องสมัคร)';


-- ══════════════════════════════════════════════════════════════════
--  SECTION 2 : TRANSACTION DATA TABLES
-- ══════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────
--  2.1  Order  (ออเดอร์ / ใบเสร็จ)
-- ─────────────────────────────────────────
CREATE TABLE `Order` (
    Receipt_ID              VARCHAR(20)     NOT NULL,          -- เช่น RC20260321001
    Order_Date              DATE            NOT NULL,
    Transaction_Timestamp   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Total_Amount            DECIMAL(10,2)   NOT NULL DEFAULT 0.00 CHECK (Total_Amount >= 0),
    Order_Status            ENUM(
                                'pending',      -- รับออเดอร์แล้ว รอทำ
                                'preparing',    -- กำลังเตรียม
                                'completed',    -- เสร็จแล้ว
                                'cancelled'     -- ยกเลิก
                            )               NOT NULL DEFAULT 'pending',
    Employee_ID             VARCHAR(10)     NOT NULL,
    Customer_ID             VARCHAR(10)         NULL,          -- NULL = ลูกค้าไม่ใช่สมาชิก (walk-in)

    CONSTRAINT pk_order         PRIMARY KEY (Receipt_ID),
    CONSTRAINT fk_order_emp     FOREIGN KEY (Employee_ID)
        REFERENCES Employee(Employee_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_order_cust    FOREIGN KEY (Customer_ID)
        REFERENCES Customer(Customer_ID)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB COMMENT='ใบเสร็จ/ออเดอร์แต่ละครั้ง';


-- ─────────────────────────────────────────
--  2.2  Payment  (การชำระเงิน)
--       1:1 กับ Order  (1 ใบเสร็จ = 1 การชำระ)
-- ─────────────────────────────────────────
CREATE TABLE Payment (
    Payment_ID      VARCHAR(20)     NOT NULL,          -- เช่น PAY20260321001
    Receipt_ID      VARCHAR(20)     NOT NULL UNIQUE,   -- UNIQUE enforce 1:1
    Payment_Type    ENUM('cash', 'qr')  NOT NULL,
    Amount_Received DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    Change_Amount   DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    Payment_Status  ENUM(
                        'pending',    -- รอชำระ
                        'completed'   -- ชำระสำเร็จ
                    )               NOT NULL DEFAULT 'pending',
    Reference_ID    VARCHAR(50)         NULL,          -- Ref No. สำหรับ QR Transfer
    Paid_At         DATETIME            NULL,          -- เวลาที่ชำระสำเร็จจริง
    Created_At      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_payment       PRIMARY KEY (Payment_ID),
    CONSTRAINT fk_payment_order FOREIGN KEY (Receipt_ID)
        REFERENCES `Order`(Receipt_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='ข้อมูลการชำระเงิน (เงินสด/QR)';


-- ─────────────────────────────────────────
--  2.3  Order_Detail  (รายการในออเดอร์)
--       1 ออเดอร์ : M รายการ
-- ─────────────────────────────────────────
CREATE TABLE Order_Detail (
    Detail_ID           INT             NOT NULL AUTO_INCREMENT,
    Receipt_ID          VARCHAR(20)     NOT NULL,
    Product_ID          VARCHAR(10)     NOT NULL,
    Quantity            INT             NOT NULL DEFAULT 1 CHECK (Quantity > 0),
    Unit_Price          DECIMAL(8,2)    NOT NULL,          -- snapshot ราคา ณ เวลาที่สั่ง
    Sub_total_Price     DECIMAL(10,2)   NOT NULL,          -- (Unit_Price + Topping) × Quantity
    Sweetness_Level     ENUM(
                            '0%',
                            '25%',
                            '50%',
                            '75%',
                            '100%'
                        )               NOT NULL DEFAULT '100%',

    CONSTRAINT pk_order_detail      PRIMARY KEY (Detail_ID),
    CONSTRAINT fk_detail_order      FOREIGN KEY (Receipt_ID)
        REFERENCES `Order`(Receipt_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_detail_product    FOREIGN KEY (Product_ID)
        REFERENCES Product(Product_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='รายละเอียดสินค้าในแต่ละออเดอร์';


-- ─────────────────────────────────────────
--  2.4  Order_Detail_Topping  (Junction)
--       M:M ระหว่าง Order_Detail ↔ Topping
--       Business Rule: เครื่องดื่ม 1 แก้ว → หลาย Topping
-- ─────────────────────────────────────────
CREATE TABLE Order_Detail_Topping (
    Detail_ID       INT             NOT NULL,
    Topping_ID      VARCHAR(10)     NOT NULL,
    Topping_Price   DECIMAL(8,2)    NOT NULL,   -- snapshot ราคา ณ เวลาที่สั่ง

    CONSTRAINT pk_detail_topping    PRIMARY KEY (Detail_ID, Topping_ID),
    CONSTRAINT fk_dt_detail         FOREIGN KEY (Detail_ID)
        REFERENCES Order_Detail(Detail_ID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_dt_topping        FOREIGN KEY (Topping_ID)
        REFERENCES Topping(Topping_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='ท็อปปิ้งในแต่ละรายการของออเดอร์ (Junction Table)';


-- ══════════════════════════════════════════════════════════════════
--  SECTION 3 : INDEXES  (เพิ่มความเร็วในการ Query)
-- ══════════════════════════════════════════════════════════════════

-- Order : ค้นหาตามวันที่ และตามพนักงาน/ลูกค้า
CREATE INDEX idx_order_date        ON `Order`(Order_Date);
CREATE INDEX idx_order_timestamp   ON `Order`(Transaction_Timestamp);
CREATE INDEX idx_order_employee    ON `Order`(Employee_ID);
CREATE INDEX idx_order_customer    ON `Order`(Customer_ID);
CREATE INDEX idx_order_status      ON `Order`(Order_Status);

-- Payment : ค้นหาตาม Status (รายงานประจำวัน)
CREATE INDEX idx_payment_status    ON Payment(Payment_Status);
CREATE INDEX idx_payment_type      ON Payment(Payment_Type);

-- Order_Detail : JOIN กับ Order บ่อยมาก
CREATE INDEX idx_detail_receipt    ON Order_Detail(Receipt_ID);
CREATE INDEX idx_detail_product    ON Order_Detail(Product_ID);

-- Product : ค้นหาตาม Category
CREATE INDEX idx_product_category  ON Product(Category);
CREATE INDEX idx_product_available ON Product(Is_Available);


-- ══════════════════════════════════════════════════════════════════
--  SECTION 4 : VIEWS  (สำหรับ Report / Dashboard)
-- ══════════════════════════════════════════════════════════════════

-- 4.1  ใบเสร็จพร้อมสถานะการชำระเงิน
CREATE OR REPLACE VIEW vw_order_summary AS
SELECT
    o.Receipt_ID,
    o.Transaction_Timestamp,
    o.Order_Date,
    o.Total_Amount,
    o.Order_Status,
    CONCAT(e.Name, ' ', e.Surname)   AS Employee_Name,
    e.Position,
    CONCAT(c.Name, ' ', c.Surname)   AS Customer_Name,   -- NULL ถ้า walk-in
    p.Payment_Type,
    p.Payment_Status,
    p.Reference_ID,
    p.Paid_At
FROM `Order` o
JOIN  Employee e  ON o.Employee_ID  = e.Employee_ID
LEFT JOIN Customer c  ON o.Customer_ID  = c.Customer_ID
LEFT JOIN Payment  p  ON o.Receipt_ID   = p.Receipt_ID;


-- 4.2  รายละเอียดออเดอร์ (เมนู + ท็อปปิ้ง)
CREATE OR REPLACE VIEW vw_order_detail_full AS
SELECT
    od.Detail_ID,
    od.Receipt_ID,
    pr.Product_Name,
    pr.Category,
    od.Sweetness_Level,
    od.Quantity,
    od.Unit_Price,
    GROUP_CONCAT(t.Topping_Name ORDER BY t.Topping_Name SEPARATOR ', ')  AS Toppings,
    IFNULL(SUM(dt.Topping_Price), 0)                                     AS Topping_Total,
    od.Sub_total_Price
FROM Order_Detail od
JOIN  Product              pr ON od.Product_ID  = pr.Product_ID
LEFT JOIN Order_Detail_Topping dt ON od.Detail_ID   = dt.Detail_ID
LEFT JOIN Topping              t  ON dt.Topping_ID  = t.Topping_ID
GROUP BY
    od.Detail_ID, od.Receipt_ID, pr.Product_Name, pr.Category,
    od.Sweetness_Level, od.Quantity, od.Unit_Price, od.Sub_total_Price;


-- 4.3  รายงานยอดขายรายวัน  (Daily Report)
CREATE OR REPLACE VIEW vw_daily_sales AS
SELECT
    o.Order_Date,
    COUNT(DISTINCT o.Receipt_ID)                                    AS Total_Orders,
    SUM(o.Total_Amount)                                             AS Total_Revenue,
    SUM(CASE WHEN p.Payment_Type = 'cash' THEN o.Total_Amount END)  AS Cash_Revenue,
    SUM(CASE WHEN p.Payment_Type = 'qr'   THEN o.Total_Amount END)  AS QR_Revenue,
    COUNT(DISTINCT o.Customer_ID)                                   AS Member_Customers
FROM `Order` o
LEFT JOIN Payment p ON o.Receipt_ID = p.Receipt_ID
WHERE o.Order_Status = 'completed'
GROUP BY o.Order_Date
ORDER BY o.Order_Date DESC;


-- 4.4  สินค้าขายดี (Best Seller)
CREATE OR REPLACE VIEW vw_best_seller AS
SELECT
    p.Product_ID,
    p.Product_Name,
    p.Category,
    SUM(od.Quantity)         AS Total_Qty_Sold,
    SUM(od.Sub_total_Price)  AS Total_Revenue
FROM Order_Detail od
JOIN Product p ON od.Product_ID = p.Product_ID
JOIN `Order` o ON od.Receipt_ID = o.Receipt_ID
WHERE o.Order_Status = 'completed'
GROUP BY p.Product_ID, p.Product_Name, p.Category
ORDER BY Total_Qty_Sold DESC;


-- ══════════════════════════════════════════════════════════════════
--  SECTION 5 : STORED PROCEDURES  (สำหรับ Demo POS Flow)
-- ══════════════════════════════════════════════════════════════════

DELIMITER $$

-- 5.1  สร้าง Receipt_ID อัตโนมัติ  RC + YYYYMMDD + running 3 digits
CREATE PROCEDURE sp_generate_receipt_id(OUT p_receipt_id VARCHAR(20))
BEGIN
    DECLARE v_today VARCHAR(8);
    DECLARE v_seq   INT;
    SET v_today = DATE_FORMAT(NOW(), '%Y%m%d');
    SELECT IFNULL(MAX(CAST(SUBSTRING(Receipt_ID, 11) AS UNSIGNED)), 0) + 1
      INTO v_seq
      FROM `Order`
     WHERE Receipt_ID LIKE CONCAT('RC', v_today, '%');
    SET p_receipt_id = CONCAT('RC', v_today, LPAD(v_seq, 3, '0'));
END$$


-- 5.2  บันทึกออเดอร์ใหม่  (Step: บันทึกรายการขาย)
--      p_items  : JSON Array  [{"product_id":"P001","qty":2,"sweetness":"50%","toppings":["T001","T002"]}, ...]
--      p_emp_id : รหัสพนักงาน
--      p_cust_id: รหัสลูกค้า (NULL = walk-in)
CREATE PROCEDURE sp_create_order(
    IN  p_emp_id   VARCHAR(10),
    IN  p_cust_id  VARCHAR(10),
    IN  p_items    JSON,
    OUT p_result   VARCHAR(20)     -- คืน Receipt_ID ถ้าสำเร็จ
)
BEGIN
    DECLARE v_receipt_id    VARCHAR(20);
    DECLARE v_total         DECIMAL(10,2) DEFAULT 0;
    DECLARE v_item_count    INT DEFAULT 0;
    DECLARE v_i             INT DEFAULT 0;
    DECLARE v_prod_id       VARCHAR(10);
    DECLARE v_qty           INT;
    DECLARE v_sweet         VARCHAR(5);
    DECLARE v_unit_price    DECIMAL(8,2);
    DECLARE v_topping_total DECIMAL(8,2);
    DECLARE v_sub_total     DECIMAL(10,2);
    DECLARE v_detail_id     INT;
    DECLARE v_j             INT;
    DECLARE v_top_count     INT;
    DECLARE v_top_id        VARCHAR(10);
    DECLARE v_top_price     DECIMAL(8,2);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = 'ERROR';
    END;

    CALL sp_generate_receipt_id(v_receipt_id);
    SET v_item_count = JSON_LENGTH(p_items);

    START TRANSACTION;

    -- สร้าง Order header
    INSERT INTO `Order` (Receipt_ID, Order_Date, Transaction_Timestamp,
                         Total_Amount, Order_Status, Employee_ID, Customer_ID)
    VALUES (v_receipt_id, CURDATE(), NOW(), 0, 'pending', p_emp_id, p_cust_id);

    -- วนแต่ละรายการสินค้า
    WHILE v_i < v_item_count DO
        SET v_prod_id = JSON_UNQUOTE(JSON_EXTRACT(p_items, CONCAT('$[', v_i, '].product_id')));
        SET v_qty     = JSON_EXTRACT(p_items, CONCAT('$[', v_i, '].qty'));
        SET v_sweet   = JSON_UNQUOTE(JSON_EXTRACT(p_items, CONCAT('$[', v_i, '].sweetness')));

        -- ดึงราคา ณ ปัจจุบัน
        SELECT Base_Price INTO v_unit_price FROM Product WHERE Product_ID = v_prod_id;

        -- คำนวณ Topping รวม
        SET v_topping_total = 0;
        SET v_top_count = JSON_LENGTH(JSON_EXTRACT(p_items, CONCAT('$[', v_i, '].toppings')));

        -- insert Order_Detail ก่อน เพื่อได้ Detail_ID
        INSERT INTO Order_Detail
            (Receipt_ID, Product_ID, Quantity, Unit_Price, Sub_total_Price, Sweetness_Level)
        VALUES
            (v_receipt_id, v_prod_id, v_qty, v_unit_price, 0, v_sweet);

        SET v_detail_id = LAST_INSERT_ID();

        -- insert Topping ของ item นี้
        SET v_j = 0;
        WHILE v_j < v_top_count DO
            SET v_top_id = JSON_UNQUOTE(
                JSON_EXTRACT(p_items, CONCAT('$[', v_i, '].toppings[', v_j, ']'))
            );
            SELECT Topping_Price INTO v_top_price FROM Topping WHERE Topping_ID = v_top_id;

            INSERT INTO Order_Detail_Topping (Detail_ID, Topping_ID, Topping_Price)
            VALUES (v_detail_id, v_top_id, v_top_price);

            SET v_topping_total = v_topping_total + v_top_price;
            SET v_j = v_j + 1;
        END WHILE;

        -- อัปเดต Sub_total_Price
        SET v_sub_total = (v_unit_price + v_topping_total) * v_qty;
        UPDATE Order_Detail SET Sub_total_Price = v_sub_total WHERE Detail_ID = v_detail_id;

        SET v_total = v_total + v_sub_total;
        SET v_i = v_i + 1;
    END WHILE;

    -- อัปเดต Total_Amount
    UPDATE `Order` SET Total_Amount = v_total WHERE Receipt_ID = v_receipt_id;

    COMMIT;
    SET p_result = v_receipt_id;
END$$


-- 5.3  บันทึกการชำระเงิน  (Step: รับชำระ → ออกใบเสร็จ)
CREATE PROCEDURE sp_process_payment(
    IN  p_receipt_id    VARCHAR(20),
    IN  p_pay_type      ENUM('cash','qr'),
    IN  p_amount_recv   DECIMAL(10,2),
    IN  p_ref_id        VARCHAR(50),       -- NULL ถ้าเงินสด
    OUT p_status        VARCHAR(20)
)
BEGIN
    DECLARE v_total     DECIMAL(10,2);
    DECLARE v_change    DECIMAL(10,2);
    DECLARE v_pay_id    VARCHAR(20);
    DECLARE v_today     VARCHAR(8);
    DECLARE v_seq       INT;

    SELECT Total_Amount INTO v_total FROM `Order` WHERE Receipt_ID = p_receipt_id;

    -- ตรวจยอด
    IF p_amount_recv < v_total THEN
        SET p_status = 'INSUFFICIENT';
    ELSE
        SET v_change = p_amount_recv - v_total;
        SET v_today  = DATE_FORMAT(NOW(), '%Y%m%d');
        SELECT IFNULL(MAX(CAST(SUBSTRING(Payment_ID, 12) AS UNSIGNED)), 0) + 1
          INTO v_seq FROM Payment
         WHERE Payment_ID LIKE CONCAT('PAY', v_today, '%');
        SET v_pay_id = CONCAT('PAY', v_today, LPAD(v_seq, 3, '0'));

        INSERT INTO Payment
            (Payment_ID, Receipt_ID, Payment_Type, Amount_Received,
             Change_Amount, Payment_Status, Reference_ID, Paid_At)
        VALUES
            (v_pay_id, p_receipt_id, p_pay_type, p_amount_recv,
             v_change, 'completed', p_ref_id, NOW());

        UPDATE `Order` SET Order_Status = 'completed' WHERE Receipt_ID = p_receipt_id;
        SET p_status = 'SUCCESS';
    END IF;
END$$

DELIMITER ;


-- ══════════════════════════════════════════════════════════════════
--  SECTION 6 : SEED DATA  (ข้อมูลตัวอย่างสำหรับ Demo)
-- ══════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────
--  6.1  Employee
-- ─────────────────────────────────────────
INSERT INTO Employee (Employee_ID, Username, Password, Position, Name, Surname, Emp_Phone, Emp_Email) VALUES
('EMP001', 'admin',     'hashed_password_here', 'Admin',   'สมชาย',   'ใจดี',     '0891234567', 'admin@nobicha.com'),
('EMP002', 'staff01',   'hashed_password_here', 'Staff',   'สุดา',     'มะลิวรรณ','0892345678', 'staff01@nobicha.com'),
('EMP003', 'staff02',   'hashed_password_here', 'Staff',   'พิมพ์',    'จันทร์เพ็ง','0893456789','staff02@nobicha.com'),
('EMP004', 'barista01', 'hashed_password_here', 'Barista', 'ธนกร',    'สุขสม',    '0894567890', 'barista01@nobicha.com'),
('EMP005', 'manager01', 'hashed_password_here', 'Manager', 'วรรณิษา', 'เจริญผล',  '0895678901', 'manager@nobicha.com');


-- ─────────────────────────────────────────
--  6.2  Product  (เมนู Nobi Cha)
-- ─────────────────────────────────────────
INSERT INTO Product (Product_ID, Product_Name, Category, Base_Price, Cost) VALUES
-- ชาไม่ต้น
('P001', 'ชาไทย',               'iced_tea',  35.00, 12.00),
('P002', 'ชาเขียวมะลิ',          'iced_tea',  35.00, 10.00),
('P003', 'ชาอู่หลง',             'iced_tea',  40.00, 14.00),
('P004', 'ชาดำมะนาว',            'iced_tea',  35.00, 10.00),
-- ชานม
('P005', 'ชานมไทย',              'milk_tea',  45.00, 16.00),
('P006', 'ชานมเขียว',            'milk_tea',  45.00, 16.00),
('P007', 'ชานมอู่หลง',           'milk_tea',  50.00, 18.00),
('P008', 'ชานมสตรอเบอรี่',       'milk_tea',  50.00, 18.00),
-- มัทฉะ
('P009', 'มัทฉะลาเต้',           'matcha',    55.00, 20.00),
('P010', 'มัทฉะ เฟรช',           'matcha',    50.00, 18.00),
-- ชาร้อน
('P011', 'ชาไทยร้อน',            'hot_tea',   30.00, 10.00),
('P012', 'ชาเขียวร้อน',          'hot_tea',   30.00,  9.00);


-- ─────────────────────────────────────────
--  6.3  Topping
-- ─────────────────────────────────────────
INSERT INTO Topping (Topping_ID, Topping_Name, Topping_Price) VALUES
('T001', 'ไข่มุก',          10.00),
('T002', 'บัก',              8.00),
('T003', 'ชีสโฟม',          15.00),
('T004', 'เยลลี่',           8.00),
('T005', 'สาคู',             8.00),
('T006', 'ครีมสด',          10.00),
('T007', 'แอลโอเวรา',        10.00),
('T008', 'ไม่ใส่ท็อปปิ้ง',   0.00);


-- ─────────────────────────────────────────
--  6.4  Customer  (ลูกค้าสมาชิก)
-- ─────────────────────────────────────────
INSERT INTO Customer (Customer_ID, Name, Surname, Cust_Phone, Cust_Email, Join_Date, Total_Points) VALUES
('C001', 'มินตรา',   'แสงทอง',   '0811111111', 'mintra@example.com',  '2026-01-10', 120),
('C002', 'ภัทร',     'ศรีสุข',    '0822222222', 'phat@example.com',    '2026-01-22', 85),
('C003', 'อารีย์',   'มงคลชัย',  '0833333333',  NULL,                  '2026-02-05', 60),
('C004', 'นที',      'เพชรรัตน์', '0844444444', 'natee@example.com',   '2026-02-14', 200),
('C005', 'จิตรา',    'สายชล',    '0855555555',  NULL,                  '2026-03-01',  10);


-- ─────────────────────────────────────────
--  6.5  ตัวอย่างออเดอร์  (3 ออเดอร์)
-- ─────────────────────────────────────────

-- ── ออเดอร์ที่ 1 : สมาชิก C001  ชำระด้วย QR ──
INSERT INTO `Order` (Receipt_ID, Order_Date, Transaction_Timestamp, Total_Amount, Order_Status, Employee_ID, Customer_ID)
VALUES ('RC202603210001', '2026-03-21', '2026-03-21 09:15:30', 120.00, 'completed', 'EMP002', 'C001');

INSERT INTO Order_Detail (Receipt_ID, Product_ID, Quantity, Unit_Price, Sub_total_Price, Sweetness_Level)
VALUES
    ('RC202603210001', 'P005', 2, 45.00,  98.00, '75%'),   -- ชานมไทย 2 แก้ว + ท็อปปิ้ง 4 บาท/แก้ว
    ('RC202603210001', 'P001', 1, 35.00,  22.00, '50%');   -- ชาไทย 1 แก้ว ไม่ใส่ท็อปปิ้ง

-- ชานมไทย → ไข่มุก + บัก
INSERT INTO Order_Detail_Topping (Detail_ID, Topping_ID, Topping_Price)
VALUES
    (1, 'T001', 10.00),
    (1, 'T002',  8.00);

-- ชาไทย → ไม่ใส่ท็อปปิ้ง (ใส่ T008 เพื่อบันทึก)
INSERT INTO Order_Detail_Topping (Detail_ID, Topping_ID, Topping_Price)
VALUES (2, 'T008', 0.00);

INSERT INTO Payment (Payment_ID, Receipt_ID, Payment_Type, Amount_Received, Change_Amount, Payment_Status, Reference_ID, Paid_At)
VALUES ('PAY202603210001', 'RC202603210001', 'qr', 120.00, 0.00, 'completed', 'QR2026032100001', '2026-03-21 09:16:05');


-- ── ออเดอร์ที่ 2 : Walk-in  ชำระเงินสด ──
INSERT INTO `Order` (Receipt_ID, Order_Date, Transaction_Timestamp, Total_Amount, Order_Status, Employee_ID, Customer_ID)
VALUES ('RC202603210002', '2026-03-21', '2026-03-21 10:30:00', 70.00, 'completed', 'EMP003', NULL);

INSERT INTO Order_Detail (Receipt_ID, Product_ID, Quantity, Unit_Price, Sub_total_Price, Sweetness_Level)
VALUES ('RC202603210002', 'P009', 1, 55.00, 70.00, '100%');  -- มัทฉะลาเต้ + ชีสโฟม

INSERT INTO Order_Detail_Topping (Detail_ID, Topping_ID, Topping_Price)
VALUES (3, 'T003', 15.00);   -- ชีสโฟม

INSERT INTO Payment (Payment_ID, Receipt_ID, Payment_Type, Amount_Received, Change_Amount, Payment_Status, Reference_ID, Paid_At)
VALUES ('PAY202603210002', 'RC202603210002', 'cash', 100.00, 30.00, 'completed', NULL, '2026-03-21 10:30:45');


-- ── ออเดอร์ที่ 3 : สมาชิก C004  ยังอยู่ระหว่างรอชำระ ──
INSERT INTO `Order` (Receipt_ID, Order_Date, Transaction_Timestamp, Total_Amount, Order_Status, Employee_ID, Customer_ID)
VALUES ('RC202603210003', '2026-03-21', '2026-03-21 11:00:00', 95.00, 'pending', 'EMP002', 'C004');

INSERT INTO Order_Detail (Receipt_ID, Product_ID, Quantity, Unit_Price, Sub_total_Price, Sweetness_Level)
VALUES
    ('RC202603210003', 'P007', 1, 50.00, 68.00, '75%'),   -- ชานมอู่หลง + ไข่มุก + บัก
    ('RC202603210003', 'P010', 1, 50.00, 27.00, '50%');   -- มัทฉะเฟรช + เยลลี่

INSERT INTO Order_Detail_Topping (Detail_ID, Topping_ID, Topping_Price)
VALUES
    (5, 'T001', 10.00),   -- ชานมอู่หลง → ไข่มุก
    (5, 'T002',  8.00),   -- ชานมอู่หลง → บัก
    (6, 'T004',  8.00);   -- มัทฉะเฟรช → เยลลี่


-- ══════════════════════════════════════════════════════════════════
--  SECTION 7 : DEMO QUERIES  (ตัวอย่าง Query สำหรับ Demo)
-- ══════════════════════════════════════════════════════════════════

-- Q1  ดูออเดอร์ทั้งหมดพร้อมสถานะ
-- SELECT * FROM vw_order_summary;

-- Q2  ดูรายละเอียดออเดอร์ที่ 1
-- SELECT * FROM vw_order_detail_full WHERE Receipt_ID = 'RC202603210001';

-- Q3  ยอดขายรายวันวันนี้
-- SELECT * FROM vw_daily_sales WHERE Order_Date = CURDATE();

-- Q4  สินค้าขายดี Top 5
-- SELECT * FROM vw_best_seller LIMIT 5;

-- Q5  สร้างออเดอร์ใหม่ผ่าน Stored Procedure
-- CALL sp_create_order(
--     'EMP002',
--     'C002',
--     '[{"product_id":"P006","qty":1,"sweetness":"50%","toppings":["T001","T003"]}]',
--     @receipt
-- );
-- SELECT @receipt;

-- Q6  ชำระเงินออเดอร์ที่ 3
-- CALL sp_process_payment('RC202603210003', 'cash', 100.00, NULL, @status);
-- SELECT @status;

-- ══════════════════════════════════════════════════════════════════
--  END OF SCRIPT
-- ══════════════════════════════════════════════════════════════════
