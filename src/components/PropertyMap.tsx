
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapLocation {
  latitude: number;
  longitude: number;
}

interface PropertyMapProps {
  center: MapLocation;
  areaPoints: MapLocation[];
}

const PropertyMap = ({ center, areaPoints }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real application, you would use a mapping API here like Google Maps or Mapbox
    // This is a placeholder that shows the coordinates and renders a visual representation
    if (!mapRef.current) return;

    const mapContainer = mapRef.current;
    
    // Clear any existing content
    mapContainer.innerHTML = '';
    
    // Create the map container
    const mapCanvas = document.createElement('div');
    mapCanvas.className = 'relative w-full h-full bg-slate-800 rounded-lg overflow-hidden';
    
    // Add the center marker
    const marker = document.createElement('div');
    marker.className = 'absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 z-20';
    marker.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
    
    // Map canvas is 100% of container, set coordinates in percentages
    const bounds = getBounds(areaPoints);
    const padding = 0.0005; // Add some padding to the bounds
    
    const minLat = bounds.minLat - padding;
    const maxLat = bounds.maxLat + padding;
    const minLng = bounds.minLng - padding;
    const maxLng = bounds.maxLng + padding;
    
    // Position the marker as percentage of map dimensions
    const markerLeft = ((center.longitude - minLng) / (maxLng - minLng)) * 100;
    const markerTop = (1 - ((center.latitude - minLat) / (maxLat - minLat))) * 100;
    
    marker.style.left = `${markerLeft}%`;
    marker.style.top = `${markerTop}%`;
    mapCanvas.appendChild(marker);
    
    // Draw the area polygon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('class', 'absolute inset-0');
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const points = areaPoints.map(point => {
      const x = ((point.longitude - minLng) / (maxLng - minLng)) * 100;
      const y = (1 - ((point.latitude - minLat) / (maxLat - minLat))) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    polygon.setAttribute('points', points);
    polygon.setAttribute('fill', 'rgba(59, 130, 246, 0.3)');
    polygon.setAttribute('stroke', 'rgba(59, 130, 246, 0.8)');
    polygon.setAttribute('stroke-width', '2');
    svg.appendChild(polygon);
    
    // Add dots for each point
    areaPoints.forEach(point => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const x = ((point.longitude - minLng) / (maxLng - minLng)) * 100;
      const y = (1 - ((point.latitude - minLat) / (maxLat - minLat))) * 100;
      
      circle.setAttribute('cx', `${x}%`);
      circle.setAttribute('cy', `${y}%`);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', 'rgba(59, 130, 246, 0.8)');
      circle.setAttribute('stroke', 'white');
      circle.setAttribute('stroke-width', '2');
      svg.appendChild(circle);
    });
    
    mapCanvas.appendChild(svg);
    
    // Add a note about the map
    const note = document.createElement('div');
    note.className = 'absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded';
    note.textContent = 'Interactive map will be available with Google Maps or Mapbox integration';
    mapCanvas.appendChild(note);
    
    // Add some coordinate labels
    const coords = document.createElement('div');
    coords.className = 'absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded';
    coords.textContent = `Center: ${center.latitude.toFixed(6)}, ${center.longitude.toFixed(6)}`;
    mapCanvas.appendChild(coords);
    
    mapContainer.appendChild(mapCanvas);
  }, [center, areaPoints]);

  // Helper function to get the bounds of the area points
  const getBounds = (points: MapLocation[]) => {
    let minLat = points[0].latitude;
    let maxLat = points[0].latitude;
    let minLng = points[0].longitude;
    let maxLng = points[0].longitude;
    
    points.forEach(point => {
      minLat = Math.min(minLat, point.latitude);
      maxLat = Math.max(maxLat, point.latitude);
      minLng = Math.min(minLng, point.longitude);
      maxLng = Math.max(maxLng, point.longitude);
    });
    
    return { minLat, maxLat, minLng, maxLng };
  };

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden">
      <div className="flex items-center justify-center h-full bg-slate-800 text-white">
        <div className="flex items-center">
          <MapPin className="mr-2" />
          <span>Loading map...</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
