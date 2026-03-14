# Prueba_Conexus
MVC de un programa de facturacion

##PRUEBAS DE CONOCIMIENTO 

1. ¿Cuál es el objetivo o funcionalidad del leguaje XML?

XML (eXtensible Markup Language) es un lenguaje de marcado cuyo objetivo es almacenar y transportar datos de forma estructurada y legible. Permite definir etiquetas personalizadas para describir la información, lo que lo hace independiente de cualquier plataforma o lenguaje de programación. Es ampliamente utilizado en configuraciones de aplicaciones, intercambio de datos entre sistemas e integración de servicios.

2. ¿Cuál es la diferencia entre un servicio Api/REST y uno WCF?

                  |                    API/REST       |                         WCF         | 
    Protocolo     |                      HTTP         |                   HTTP, TCP, MSMQ   |
Formato de datos  |                   JSON, XML       |                      XML(SOAP)      |
  Compatibilidad  |        Cualquier cliente con HTTP |     Pricipalemente ecosistemas .NET |
  Complejidad     |               Simple y ligero     |               Robusto y complejo    |
  Uso recomendado |       Aplicaciones web y moviles  |    Sistemas empresariales internos  |


En resumen, API/REST es más liviano, flexible y moderno, ideal para aplicaciones web. WCF (Windows Communication Foundation) es más robusto y adecuado para entornos empresariales que requieren múltiples protocolos de comunicación y mayor seguridad transaccional.

3. ¿Para qué casos sería recomendable usar una vista y no una tabla de la base de datos?

Usario una en los siguientes casos:

- Para simplificar consultas complejas que involucran multiples tablas con Join.
- Restringir el acceso a la base de datos a informacion o datos sensibles dentro de la base de datos. Mostrando solo la informacion necesaria
- Presentar datos calculados o combinados sin necesidad de almacenarlos fisicamente
- Cuando se busca estandarizar consultas que son usadas frecuentemente en diferentes partes del aplicativo o sistema.

4. ¿Cuál es el Objetivo o funcionalidad de una petición Json?

JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos cuyo objetivo es transmitir información estructurada entre un cliente y un servidor de forma simple y eficiente. En el contexto de una API/REST, las peticiones JSON permiten enviar y recibir datos en un formato compatible, independiente del lenguaje de programación. Su sintaxis es fácil de leer y procesar, lo que lo convierte en el estándar más utilizado para la comunicación entre aplicaciones web modernas.

## Escriba un script que permita crear una base de datos con la siguiente estructura (Incluir Llaves primarias y foráneas):

Los Scripts para la creacion de la base de datos y las diferentes sentencias que seran usadas durante el desarrollo de esta prueba se encuentran dentro de la carpeta
**DB_CONEXUS**.

