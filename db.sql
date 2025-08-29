CREATE DATABASE IF NOT EXISTS ecommerce_edu;

USE ecommerce_edu;
-- ======================================
-- TABLA ROLES
-- ======================================
CREATE TABLE rol (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,  
    descripcion VARCHAR(255)
);

-- ======================================
-- TABLA EMPLEADOS
-- ======================================
CREATE TABLE empleado (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,    
    rol_id BIGINT NOT NULL,              
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_empleado_rol FOREIGN KEY (rol_id) REFERENCES rol(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ======================================
-- TABLA PROVEEDORES
-- ======================================
CREATE TABLE proveedor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(150) UNIQUE,
    direccion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ======================================
-- TABLA CATEGORÍAS
-- ======================================
CREATE TABLE categoria (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ======================================
-- TABLA PRODUCTOS
-- ======================================
CREATE TABLE producto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    categoria_id BIGINT,
    proveedor_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_producto_categoria FOREIGN KEY (categoria_id) REFERENCES categoria(id)
        ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT fk_producto_proveedor FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- ======================================
-- DATOS INICIALES
-- ======================================

-- Roles base
INSERT INTO rol (nombre, descripcion) VALUES
('ADMIN', 'Administrador con acceso total'),
('VENDEDOR', 'Empleado encargado de las ventas');

-- Categorías base
INSERT INTO categoria (nombre, descripcion) VALUES
('Electrónica', 'Productos electrónicos en general'),
('Ropa', 'Prendas de vestir'),
('Alimentos', 'Productos alimenticios');
