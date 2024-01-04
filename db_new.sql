------------CREATE TABLE QUYDINH
DROP TABLE IF EXISTS "QuyDinh";
CREATE TABLE "QuyDinh" (
  "SoLuongNhapItNhat" int,
	"SoLuongTonToiDaKhiNhap" int,
	"NoToiDa" int,
	"TonSauToiThieu" int,
	"ApDungQuyDinh4" int
);


--------------CREATE TABLE PHIEUTHUTIEN
DROP TABLE IF EXISTS "PhieuThuTien";
CREATE TABLE "PhieuThuTien" (
  "MaPhieuThuTien" serial NOT NULL PRIMARY KEY,
	"KhachHang" int4 NOT NULL,
	"SoTienThu" int4 NOT NULL,
	"NgayThuTien" timestamp NOT NULL
)
;

--------------CREATE TABLE KHACHHANG
DROP TABLE IF EXISTS "KhachHang";
CREATE TABLE "KhachHang" (
  "MaKH" serial NOT NULL PRIMARY KEY,
	"TenKH" varchar(50) NOT NULL,
	"DiaChi" varchar(200),
	"Email" varchar(100),
	"SDT" varchar(11),
	"No" int4
)
;

----------CREATE TABLE BaoCaoCongNo
DROP TABLE IF EXISTS "BaoCaoCongNo";
CREATE TABLE "BaoCaoCongNo" (
  "MaBCCongNo" serial NOT NULL PRIMARY KEY,
	"KhachHang" int4 NOT NULL,
	"NoDau" int4,
	"NoCuoi" int4,
	"Thang" int4,
	"Nam" int4
)
;

-- ----------CREATE TABLE TACGIA
-- DROP TABLE IF EXISTS "TacGia";
-- CREATE TABLE "TacGia" (
--   "MaTG" serial NOT NULL PRIMARY KEY,
-- 	"TenTG" varchar(100) NOT NULL
-- )
-- ;

-- ----------CREATE TABLE ThongTinTacGia
-- DROP TABLE IF EXISTS "ThongTinTacGia";
-- CREATE TABLE "ThongTinTacGia" (
--   "MaTG" int4 NOT NULL,
-- 	"MaSach" int4 NOT NULL,
-- 	PRIMARY KEY("MaTG", "MaSach")
-- )
-- ;

----------CREATE TABLE Sach
DROP TABLE IF EXISTS "Sach";
CREATE TABLE "Sach" (
  "MaSach" serial NOT NULL PRIMARY KEY,
	"TenSach" varchar(100) NOT NULL,
	"TacGia" varchar(100) NOT NULL,
	"SoLuong" int4,
	"Gia" int4,
	"TheLoai" varchar(100)
)
;

---------CREATE TABLE HOADON
DROP TABLE IF EXISTS "HoaDon";
CREATE TABLE "HoaDon" (
  "MaHoaDon" serial NOT NULL PRIMARY KEY,
	"KhachHang" int4 NOT NULL,
	"NgayLap" timestamp,
	"ThanhTien" int4,
 "GhiNo" int4 CHECK ("GhiNo" IN (0, 1))
)
;

---------CREATE TABLE ThongTinHoaDon
DROP TABLE IF EXISTS "ThongTinHoaDon";
CREATE TABLE "ThongTinHoaDon" (
  "MaHoaDon" int4 NOT NULL,
	"MaThongTinHD" serial PRIMARY KEY,
	"MaSach" int4,
	"SoLuong" int4,
	"DonGia" int4
)
;

---------CREATE TABLE ThongTinNhapSach
DROP TABLE IF EXISTS "ThongTinNhapSach";
CREATE TABLE "ThongTinNhapSach" (
  "MaDonNS" int4 NOT NULL,
	"MaThongTinNS" serial NOT NULL PRIMARY KEY,
	"MaSach" int4,
	"SoLuong" int4,
	"DonGia" int4
)
;

---------CREATE TABLE DonNhapSach
DROP TABLE IF EXISTS "DonNhapSach";
CREATE TABLE "DonNhapSach" (
  "MaDonNS" serial NOT NULL PRIMARY KEY,
	"NgayNhap" timestamp
)
;

---------CREATE TABLE ThongTinBCTon
DROP TABLE IF EXISTS "ThongTinBCTon";
CREATE TABLE "ThongTinBCTon" (
  "MaBCTon" int4 NOT NULL,
	"MaThongTinBCT" serial NOT NULL PRIMARY KEY,
	"MaSach" int4,
	"TonTruoc" int4,
	"TonSau" int4,
	"PhatSinh" int4
)
;

---------CREATE TABLE BaoCaoTon
DROP TABLE IF EXISTS "BaoCaoTon";
CREATE TABLE "BaoCaoTon" (
  "MaBCTon" serial NOT NULL PRIMARY KEY,
	"Thang" int4,
	"Nam" int4
)
;

---------CREATE TABLE admin
DROP TABLE IF EXISTS "admin";
CREATE TABLE "admin" (
  "Username" varchar(50),
	"Password" varchar(200)
)
;

-- ----------------------------
-- Foreign Keys structure for table PhieuThuTien
-- ----------------------------
ALTER TABLE "PhieuThuTien" ADD CONSTRAINT "FK_PTT_KH" FOREIGN KEY ("KhachHang") REFERENCES "KhachHang" ("MaKH");

-- ----------------------------
-- Foreign Keys structure for table BaoCaoCongNo
-- ----------------------------
ALTER TABLE "BaoCaoCongNo" ADD CONSTRAINT "FK_BCCN_KH" FOREIGN KEY ("KhachHang") REFERENCES "KhachHang" ("MaKH");


-- ----------------------------
-- Foreign Keys structure for table HonDon
-- ----------------------------
ALTER TABLE "HoaDon" ADD CONSTRAINT "FK_HD_KH" FOREIGN KEY ("KhachHang") REFERENCES "KhachHang" ("MaKH");

-- ----------------------------
-- Foreign Keys structure for table ThongTinHoaDon
-- ----------------------------
ALTER TABLE "ThongTinHoaDon" ADD CONSTRAINT "FK_TTHD_HD" FOREIGN KEY ("MaHoaDon") REFERENCES "HoaDon" ("MaHoaDon");
ALTER TABLE "ThongTinHoaDon" ADD CONSTRAINT "FK_TTHD_Sach" FOREIGN KEY ("MaSach") REFERENCES "Sach" ("MaSach");

-- -- ----------------------------
-- -- Foreign Keys structure for table ThongTinTacGia
-- -- ----------------------------
-- ALTER TABLE "ThongTinTacGia" ADD CONSTRAINT "FK_TTTG_TG" FOREIGN KEY ("MaTG") REFERENCES "TacGia" ("MaTG");
-- ALTER TABLE "ThongTinTacGia" ADD CONSTRAINT "FK_TTTG_Sach" FOREIGN KEY ("MaSach") REFERENCES "Sach" ("MaSach");

-- ----------------------------
-- Foreign Keys structure for table ThongTinNhapSach
-- ----------------------------
ALTER TABLE "ThongTinNhapSach" ADD CONSTRAINT "FK_TTNS_DonNS" FOREIGN KEY ("MaDonNS") REFERENCES "DonNhapSach" ("MaDonNS");
ALTER TABLE "ThongTinNhapSach" ADD CONSTRAINT "FK_TTNS_Sach" FOREIGN KEY ("MaSach") REFERENCES "Sach" ("MaSach");

-- ----------------------------
-- Foreign Keys structure for table ThongTinBCTon
-- ----------------------------
ALTER TABLE "ThongTinBCTon" ADD CONSTRAINT "FK_TTBCTon_Sach" FOREIGN KEY ("MaSach") REFERENCES "Sach" ("MaSach");
ALTER TABLE "ThongTinBCTon" ADD CONSTRAINT "FK_TTBCTon_BaoCaoTon" FOREIGN KEY ("MaBCTon") REFERENCES "BaoCaoTon" ("MaBCTon");


BEGIN;
-- 	INSERT INTO "Sach"("TenSach", "SoLuong", "Gia", "TheLoai", "TacGia") VALUES ('Đắc Nhân Tâm', 150, 155000, 'Triết lý cuộc sống', 'Dale Carnegie');
-- 	INSERT INTO "Sach"("TenSach", "SoLuong", "Gia", "TheLoai", "TacGia") VALUES ('Nhà giả kim', 150, 85000, 'Triết lý cuộc sống', 'Paulo Coelho');
-- 	INSERT INTO "Sach"("TenSach", "SoLuong", "Gia", "TheLoai", "TacGia") VALUES ('Quẳng gánh lo đi và vui sống', 350, 105000.500, 'Triết lý cuộc sống', 'Dale Carnegie');
	INSERT INTO "admin"("Username", "Password") VALUES('admin', '$2a$10$vAOmsLd0OPkTzNAp.cLW9uS2LOXjPZLKzUAtl6mMVu1ihCJ/466oq');
	INSERT INTO "admin"("Username", "Password") VALUES('admin1', '$2a$10$yVxR1sLOSWKzASx5Pi8nf.IO4W09mEVeAUO7fRncD49jsdgJuZfTm');
-- 	INSERT INTO "KhachHang"("TenKH", "DiaChi", "Email", "No", "SDT") VALUES('Nguyễn Toàn', 'Thủ Đức, HCM', 'toan@gmail.com', 0, '0387578000');
-- 	INSERT INTO "KhachHang"("TenKH", "DiaChi", "Email", "No", "SDT") VALUES('Nguyễn A', 'Quận 5, HCM', 'a_abc@gmail.com', 0, '0387579000');
	INSERT INTO "QuyDinh"("SoLuongNhapItNhat", "SoLuongTonToiDaKhiNhap", "NoToiDa", "TonSauToiThieu", "ApDungQuyDinh4") VALUES(150, 300, 20000, 20, 1);
COMMIT;

select * from "Sach";
select * from "admin";
select * from "KhachHang";
select * from "HoaDon";
select * from "DonNhapSach";
select * from "PhieuThuTien";
select * from "QuyDinh";
-- SELECT * FROM public."KhachHang" WHERE "SDT" LIKE '0387578000' AND lower("TenKH") ILIKE 'Nguyễn Toàn';


-- INSERT INTO "HoaDon"("KhachHang", "NgayLap", "ThanhTien") VALUES(1, '2023/2/19', 400000);
-- UPDATE "Sach" SET "SoLuong" = "SoLuong" - 5 WHERE "MaSach" = 1


-- DELETE FROM "admin" where "admin"."Username" = 'admin';
-- DELETE FROM "KhachHang" where "MaKH" = 4