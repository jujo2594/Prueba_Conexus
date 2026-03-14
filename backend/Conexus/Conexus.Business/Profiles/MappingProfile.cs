using AutoMapper;
using Conexus.Business.DTOs;
using Conexus.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conexus.Business.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Cliente, ClienteDto>().ReverseMap();

            CreateMap<Emisor, EmisorDto>().ReverseMap();

            CreateMap<Producto, ProductoDto>().ReverseMap();

            CreateMap<Factura, FacturaDto>()
                .ForMember(dest => dest.NombreCliente,
                    opt => opt.MapFrom(src => src.IdClienteNavigation != null
                        ? src.IdClienteNavigation.Nombres + " " + src.IdClienteNavigation.Apellidos
                        : string.Empty))
                .ForMember(dest => dest.RazonSocial,
                    opt => opt.MapFrom(src => src.IdEmisorNavigation != null
                        ? src.IdEmisorNavigation.RazonSocial
                        : string.Empty))
                .ForMember(dest => dest.Detalles,
                    opt => opt.MapFrom(src => src.DetalleFacturas))
                .ReverseMap();

            CreateMap<DetalleFactura, DetalleFacturaDto>()
                .ForMember(dest => dest.NombreProducto,
                    opt => opt.MapFrom(src => src.IdProductoNavigation != null
                        ? src.IdProductoNavigation.NombreProducto
                        : string.Empty))
                .ReverseMap();
        }
    }
}
