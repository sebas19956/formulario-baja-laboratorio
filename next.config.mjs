/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/formulario-baja-laboratorio', // Cambia esto por el nombre exacto de tu repositorio
  assetPrefix: '/formulario-baja-laboratorio/' // Cambia esto también
}

export default nextConfig
