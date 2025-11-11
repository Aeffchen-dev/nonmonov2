// Utility to add 2px rectangles at path intersection points in SVG icons
export function addIntersectionDots() {
  const icons = document.querySelectorAll('svg[class*="lucide"]');
  
  icons.forEach((icon) => {
    const svg = icon as SVGSVGElement;
    const paths = svg.querySelectorAll('path, line, polyline');
    
    if (paths.length < 2) return;
    
    const pathElements = Array.from(paths);
    const intersections: { x: number; y: number }[] = [];
    
    // Compare each path with every other path to find intersections
    for (let i = 0; i < pathElements.length; i++) {
      for (let j = i + 1; j < pathElements.length; j++) {
        const points = findPathIntersections(pathElements[i], pathElements[j]);
        intersections.push(...points);
      }
    }
    
    // Add 2px rectangles at each intersection point
    intersections.forEach(({ x, y }) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', (x - 1).toString());
      rect.setAttribute('y', (y - 1).toString());
      rect.setAttribute('width', '2');
      rect.setAttribute('height', '2');
      rect.setAttribute('fill', 'currentColor');
      rect.setAttribute('class', 'intersection-dot');
      svg.appendChild(rect);
    });
  });
}

function findPathIntersections(path1: Element, path2: Element): { x: number; y: number }[] {
  const intersections: { x: number; y: number }[] = [];
  
  try {
    const svg = (path1 as SVGGeometryElement).ownerSVGElement;
    if (!svg) return intersections;
    
    const length1 = (path1 as SVGGeometryElement).getTotalLength?.() || 0;
    const length2 = (path2 as SVGGeometryElement).getTotalLength?.() || 0;
    
    if (length1 === 0 || length2 === 0) return intersections;
    
    const step = 1; // Check every 1px along the paths
    const threshold = 2; // Intersection detection threshold
    
    for (let i = 0; i < length1; i += step) {
      const point1 = (path1 as SVGGeometryElement).getPointAtLength(i);
      
      for (let j = 0; j < length2; j += step) {
        const point2 = (path2 as SVGGeometryElement).getPointAtLength(j);
        
        const distance = Math.sqrt(
          Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
        );
        
        if (distance < threshold) {
          // Check if this intersection is not too close to an existing one
          const isDuplicate = intersections.some(
            existing => Math.sqrt(
              Math.pow(existing.x - point1.x, 2) + Math.pow(existing.y - point1.y, 2)
            ) < 3
          );
          
          if (!isDuplicate) {
            intersections.push({ x: point1.x, y: point1.y });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error finding intersections:', error);
  }
  
  return intersections;
}
