# Weather Challenge

## Requisitos Previos

- [Bun](https://bun.sh/) (v1.2.0 o superior)
- [Redis](https://redis.io/) (corriendo en el puerto predeterminado 6379)

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   bun install
   ```

## Ejecución del Proyecto

### 1. Compilar el Frontend

```bash
bun run build:front
```

### 2. Iniciar el Backend

En una terminal separada:

```bash
OPENWEATHER_API_KEY=API_KEY \
REDIS_URL=redis:// \
PORT=4000 \
bun run start:back
```

### 3. Iniciar el Frontend

En otra terminal:

```bash
bun run start:front
```

## Variables de Entorno (Backend)

| Variable              | Descripción                             | Valor Requerido    |
| --------------------- | --------------------------------------- | ------------------ |
| `OPENWEATHER_API_KEY` | API Key para el servicio de OpenWeather | Cadena válida      |
| `REDIS_URL`           | URL de conexión a Redis                 | `redis://` (local) |
| `PORT`                | Puerto del servidor backend             | **Debe ser 4000**  |

## Notas de Desarrollo

### Herramientas de IA Utilizadas

Para este challenge, utilicé la extensión de **Copilot** en VSCode, que fue especialmente útil en tareas repetitivas como la generación de tipos e interfaces en TypeScript, además de otras acciones similares donde el autocompletado ahorró tiempo.

También recurrí a **ChatGPT** para crear los archivos types.ts de los servicios de [Reservamos](./backend/src/core/services/reservamos/types.ts) y [OpenWeather](./backend/src/core/services/open-weather/types.ts). Esto me ayudó a implementar de manera sencilla los tipos de TypeScript necesarios para las respuestas de estas APIs. Para ello, utilicé el siguiente prompt:

```markdown
Generate TypeScript types from a given JSON response for an external API.

# Output Format

- Provide the TypeScript types/interfaces concisely
- Use proper TypeScript syntax

<json_body>
[Pega aquí el JSON]
</json_body>
```

Además, utilicé **ChatGPT** para realizar ajustes rápidos en la interfaz, como la creación de gradientes para las tarjetas con soporte para modo oscuro. Esto me permitió probar varias versiones de manera sencilla y eficiente.

## Notas Adicionales

- El backend **debe** ejecutarse en el puerto 4000 para compatibilidad con el frontend
