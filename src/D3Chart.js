import React, { useEffect } from 'react';
import * as d3 from 'd3';

function D3Chart({ data }) {
  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      return; // You can render some fallback content here if needed
    }

    const margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#d3-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.title))
      .range([0, width])
      .padding(0.1);
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.budget)])
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.title))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.budget))
      .attr('height', d => height - y(d.budget));

  }, [data]);

  return <div id="d3-chart"></div>;
}

export default D3Chart;
