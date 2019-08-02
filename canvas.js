document.addEventListener('DOMContentLoaded', () => {
    // state
    let draw = false
    let color = 'black'
    let stroke = '1'
    // elements
    let svg = null
    let points = []
    let lines = []

    document.querySelectorAll('circle').forEach(circle => {
        circle.onclick = () => {
            const old_color = color
            color = circle.id
            d3.select(`#${old_color}`).attr('stroke', old_color).attr('stroke-width', 0)
            d3.select(`#${color}`).attr('stroke', 'pink').attr('stroke-width', 3)
        }
    })

    document.querySelectorAll('line').forEach(line => {
        line.onclick = () => {
            const old_stroke = stroke
            stroke = line.id[1]
            d3.select(`#s${old_stroke}`).attr('stroke', 'black')
            d3.select(`#s${stroke}`).attr('stroke', 'grey')
        }
    })

    document.querySelector('#erase').onclick = () => {
        for (let i = 0; i < points.length; i++)
            points[i].remove()
        for (let i = 0; i < lines.length; i++)
            lines[i].remove()
        points = []
        lines = []
    }

    function render() {
        svg = d3.select('#svg')
                .attr('height', window.innerHeight)
                .attr('width', window.innerWidth)
        svg.on('mousedown', function() {
            draw = true
            const coords = d3.mouse(this)
            draw_point(coords[0], coords[1], false)
        })

        svg.on('mouseup', () => {
            draw = false
        })

        svg.on('mousemove', function() {
            if (!draw)
                return
            const coords = d3.mouse(this)
            draw_point(coords[0], coords[1], true)
        })
    }

    function draw_point(x, y, connect) {
        if ((x <= 55 && y <= 305) || (x <= 90 && y > 345 && y < 455)) {
            draw = false
            return
        }
        if (connect) {
            const last_point = points[points.length - 1]
            const line = svg.append('line')
                            .attr('x1', last_point.attr('cx'))
                            .attr('y1', last_point.attr('cy'))
                            .attr('x2', x)
                            .attr('y2', y)
                            .attr('stroke-width', stroke)
                            .style('stroke', color)
            lines.push(line)
        }
        const point = svg.append('circle')
                         .attr('cx', x)
                         .attr('cy', y)
                         .attr('r', stroke / 2)
                         .style('fill', color)
        points.push(point)
    }
    render()
})
