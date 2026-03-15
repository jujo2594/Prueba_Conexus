using Conexus.Business.Interfaces;
using Conexus.Business.Profiles;
using Conexus.Business.Services;
using Conexus.Data.Data;
using Conexus.Data.Interfaces;
using Conexus.Data.Models;
using Conexus.Data.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ConexusDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConexusDb")));

builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());

builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IEmisorRepository, EmisorRepository>();
builder.Services.AddScoped<IProductoRepository, ProductoRepository>();
builder.Services.AddScoped<IFacturaRepository, FacturaRepository>();

builder.Services.AddScoped<IClienteService, ClienteService>();
builder.Services.AddScoped<IEmisorService, EmisorService>();
builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddScoped<IFacturaService, FacturaService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReact");

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ConexusDbContext>();

    // Emisores
    if (!db.Emisores.Any())
    {
        db.Emisores.Add(new Emisor
        {
            Identificacion = "900123456",
            RazonSocial = "Conexus-IT S.A.S",
            Telefono = "6076543210",
            Email = "info@conexusit.com",
            Direccion = "Carrera 27 No. 37-33 Bucaramanga"
        });
        db.SaveChanges();
    }

    // Clientes
    if (!db.Clientes.Any())
    {
        db.Clientes.AddRange(
            new Cliente
            {
                Identificacion = "1098765432",
                Nombres = "Juan",
                Apellidos = "García",
                Telefono = "3001234567",
                Email = "juan.garcia@email.com",
                Direccion = "Calle 10 No. 5-20 Bucaramanga"
            },
            new Cliente
            {
                Identificacion = "1087654321",
                Nombres = "María",
                Apellidos = "López",
                Telefono = "3109876543",
                Email = "maria.lopez@email.com",
                Direccion = "Avenida 30 No. 15-40 Bucaramanga"
            }
        );
        db.SaveChanges();
    }

    // Productos
    if (!db.Productos.Any())
    {
        db.Productos.AddRange(
            new Producto
            {
                Codigo = "PROD001",
                NombreProducto = "Laptop Dell Inspiron",
                Descripcion = "Laptop Dell Inspiron 15 pulgadas",
                PrecioBase = 2500000
            },
            new Producto
            {
                Codigo = "PROD002",
                NombreProducto = "Mouse Inalámbrico",
                Descripcion = "Mouse inalámbrico HP",
                PrecioBase = 85000
            },
            new Producto
            {
                Codigo = "PROD003",
                NombreProducto = "Teclado Mecánico",
                Descripcion = "Teclado mecánico RGB",
                PrecioBase = 250000
            }
        );
        db.SaveChanges();
    }

    // Facturas
    if (!db.Facturas.Any())
    {
        db.Facturas.AddRange(
            new Factura
            {
                IdCliente = 1,
                IdEmisor = 1,
                FechaFactura = new DateTime(2026, 3, 1),
                TotalFactura = 2585000
            },
            new Factura
            {
                IdCliente = 2,
                IdEmisor = 1,
                FechaFactura = new DateTime(2026, 3, 5),
                TotalFactura = 335000
            }
        );
        db.SaveChanges();
    }

    // DetalleFacturas
    if (!db.DetalleFacturas.Any())
    {
        db.DetalleFacturas.AddRange(
            new DetalleFactura
            {
                IdFactura = 1,
                IdProducto = 1,
                Cantidad = 1,
                PrecioUnitario = 2500000,
                Subtotal = 2500000,
                Total = 2500000
            },
            new DetalleFactura
            {
                IdFactura = 1,
                IdProducto = 2,
                Cantidad = 1,
                PrecioUnitario = 85000,
                Subtotal = 85000,
                Total = 85000
            },
            new DetalleFactura
            {
                IdFactura = 2,
                IdProducto = 2,
                Cantidad = 1,
                PrecioUnitario = 85000,
                Subtotal = 85000,
                Total = 85000
            },
            new DetalleFactura
            {
                IdFactura = 2,
                IdProducto = 3,
                Cantidad = 1,
                PrecioUnitario = 250000,
                Subtotal = 250000,
                Total = 250000
            }
        );
        db.SaveChanges();
    }
}

app.Run();
