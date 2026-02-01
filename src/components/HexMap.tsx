import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Section data for the 6 hexagons
const sections = [
  { id: 1, title: 'About', content: 'Software Engineer' },
  { id: 2, title: 'Experience', content: 'Professional Background' },
  { id: 3, title: 'Skills', content: 'Technical Expertise' },
  { id: 4, title: 'Education', content: 'Academic Background' },
  { id: 5, title: 'Projects', content: 'Portfolio Work' },
  { id: 6, title: 'Contact', content: 'Get in Touch' },
];

interface HexMapProps {
  width?: number;
  height?: number;
}

// Generate hexagon path from center point and radius (flat-top orientation)
const hexagonPath = (cx: number, cy: number, radius: number): string => {
  const points: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    // Flat-top hexagon: vertices at 0°, 60°, 120°, 180°, 240°, 300°
    const angle = (Math.PI / 3) * i;
    points.push([
      cx + radius * Math.cos(angle),
      cy + radius * Math.sin(angle),
    ]);
  }
  return points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ') + 'Z';
};

// Calculate hexagon center positions in flower pattern (6 hexagons touching edges)
const getHexagonCenters = (centerX: number, centerY: number, radius: number): { x: number; y: number }[] => {
  // For pointy-top hexagons in a ring pattern, each center is sqrt(3) * radius from the center
  const distanceFromCenter = radius * Math.sqrt(3);
  const positions: { x: number; y: number }[] = [];

  for (let i = 0; i < 6; i++) {
    // Start from top, go clockwise
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    positions.push({
      x: centerX + distanceFromCenter * Math.cos(angle),
      y: centerY + distanceFromCenter * Math.sin(angle),
    });
  }

  return positions;
};

const HexMap: React.FC<HexMapProps> = ({ width = 800, height = 700 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const centerX = width / 2;
    const centerY = height / 2;
    const hexRadius = Math.min(width, height) / 5;

    const centers = getHexagonCenters(centerX, centerY, hexRadius);

    // Create a group for each hexagon
    const hexGroups = svg
      .selectAll('g.hex-group')
      .data(sections)
      .enter()
      .append('g')
      .attr('class', 'hex-group')
      .style('cursor', 'pointer');

    // Draw hexagon paths
    hexGroups
      .append('path')
      .attr('d', (_, i) => hexagonPath(centers[i].x, centers[i].y, hexRadius))
      .attr('fill', 'rgba(201, 162, 39, 0.15)')
      .attr('stroke', '#c9a227')
      .attr('stroke-width', 2)
      .on('mouseenter', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', 'rgba(201, 162, 39, 0.3)');
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', 'rgba(201, 162, 39, 0.15)');
      });

    // Add title text
    hexGroups
      .append('text')
      .attr('x', (_, i) => centers[i].x)
      .attr('y', (_, i) => centers[i].y - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f5f5f5')
      .attr('font-family', "'Squada One', sans-serif")
      .attr('font-size', '1.5rem')
      .text((d) => d.title);

    // Add content text
    hexGroups
      .append('text')
      .attr('x', (_, i) => centers[i].x)
      .attr('y', (_, i) => centers[i].y + 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f5f5f5')
      .attr('font-family', "'Overpass', sans-serif")
      .attr('font-size', '0.85rem')
      .attr('opacity', 0.8)
      .text((d) => d.content);

  }, [width, height]);

  return (
    <div className="hex-map-container">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default HexMap;
