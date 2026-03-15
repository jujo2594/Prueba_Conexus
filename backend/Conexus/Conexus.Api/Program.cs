using Conexus.Business.Interfaces;
using Conexus.Business.Profiles;
using Conexus.Business.Services;
using Conexus.Data.Data;
using Conexus.Data.Interfaces;
using Conexus.Data.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ConexusDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConexusDb")));

builder.Services.AddAutoMapper(typeof(MappingProfile));

//Repositorios
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IEmisorRepository, EmisorRepository>();
builder.Services.AddScoped<IProductoRepository, ProductoRepository>();
builder.Services.AddScoped<IFacturaRepository, FacturaRepository>();

//Servicios
builder.Services.AddScoped<IClienteService, ClienteService>();
builder.Services.AddScoped<IEmisorService, EmisorService>();
builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddScoped<IFacturaService, FacturaService>();

//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container.

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

app.Run();
