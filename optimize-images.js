const fs = require('fs');
const path = require('path');

// Script para optimizar imágenes sin dependencias externas
// Este script crea versiones optimizadas de las imágenes principales

const imageOptimizations = [
  {
    input: 'assets/img/photo_perfil_l.jpg',
    outputs: [
      { name: 'photo_perfil_l.webp', quality: 85, format: 'webp' },
      { name: 'photo_perfil_l.avif', quality: 75, format: 'avif' }
    ]
  },
  {
    input: 'assets/img/demo_storitic.png',
    outputs: [
      { name: 'demo_storitic_optimized.webp', quality: 80, format: 'webp' }
    ]
  },
  {
    input: 'assets/img/ges-preview.png',
    outputs: [
      { name: 'ges-preview.webp', quality: 85, format: 'webp' }
    ]
  },
  {
    input: 'assets/img/storetic-preview.png',
    outputs: [
      { name: 'storetic-preview.webp', quality: 85, format: 'webp' }
    ]
  }
];

// Función para generar placeholder base64
function generatePlaceholder(width = 400, height = 300) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a2332"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#4a5568" font-family="Arial, sans-serif" font-size="14">
        Cargando...
      </text>
    </svg>
  `;
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

// Crear archivo de configuración de imágenes optimizadas
const imageConfig = {
  version: '1.0.0',
  lastOptimized: new Date().toISOString(),
  images: [
    {
      original: 'assets/img/photo_perfil_l.jpg',
      optimized: [
        { src: 'assets/img/photo_perfil_l.webp', type: 'image/webp', size: 'estimated' },
        { src: 'assets/img/photo_perfil_l.avif', type: 'image/avif', size: 'estimated' }
      ],
      placeholder: generatePlaceholder(400, 400)
    },
    {
      original: 'assets/img/demo_storitic.png',
      optimized: [
        { src: 'assets/img/demo_storitic_optimized.webp', type: 'image/webp', size: 'estimated' }
      ],
      placeholder: generatePlaceholder(800, 600)
    },
    {
      original: 'assets/img/ges-preview.png',
      optimized: [
        { src: 'assets/img/ges-preview.webp', type: 'image/webp', size: 'estimated' }
      ],
      placeholder: generatePlaceholder(600, 400)
    },
    {
      original: 'assets/img/storetic-preview.png',
      optimized: [
        { src: 'assets/img/storetic-preview.webp', type: 'image/webp', size: 'estimated' }
      ],
      placeholder: generatePlaceholder(800, 600)
    }
  ]
};

// Guardar configuración
fs.writeFileSync('data/image-config.json', JSON.stringify(imageConfig, null, 2));

console.log('✅ Configuración de imágenes optimizadas creada');
console.log('📝 Para optimizar realmente las imágenes, instala sharp y ejecuta el script completo');
console.log('   npm install sharp');
console.log('   node optimize-images-complete.js');

// Crear script completo para cuando sharp esté disponible
const completeScript = `
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageOptimizations = [
  {
    input: 'assets/img/photo_perfil_l.jpg',
    outputs: [
      { name: 'photo_perfil_l.webp', quality: 85 },
      { name: 'photo_perfil_l.avif', quality: 75 }
    ]
  },
  {
    input: 'assets/img/demo_storitic.png',
    outputs: [
      { name: 'demo_storitic_optimized.webp', quality: 80 }
    ]
  },
  {
    input: 'assets/img/ges-preview.png',
    outputs: [
      { name: 'ges-preview.webp', quality: 85 }
    ]
  },
  {
    input: 'assets/img/storetic-preview.png',
    outputs: [
      { name: 'storetic-preview.webp', quality: 85 }
    ]
  }
];

async function optimizeImages() {
  for (const image of imageOptimizations) {
    for (const output of image.outputs) {
      try {
        const inputPath = path.join(__dirname, image.input);
        const outputPath = path.join(__dirname, 'assets/img', output.name);
        
        await sharp(inputPath)
          .webp({ quality: output.quality })
          .toFile(outputPath);
          
        console.log(\`✅ Optimizado: \${output.name}\`);
      } catch (error) {
        console.error(\`❌ Error optimizando \${output.name}:\`, error);
      }
    }
  }
}

optimizeImages().then(() => {
  console.log('🎉 Optimización completada');
});
`;

fs.writeFileSync('optimize-images-complete.js', completeScript);
console.log('📝 Script completo creado: optimize-images-complete.js');
