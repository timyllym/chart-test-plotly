var timer, counter, that, startval, numberOfPoints;

Polymer({
    is: "mychart",
    properties: {
        cols: {
            type: Array,
            value: []
        },
        rows: {
            type: Array,
            value: []
        },
        chart: {
            type: Object
        }
    },
    initChart() {
        this.chart = document.getElementById('chart');
    	Plotly.plot( this.chart, [{
            x: ['giraffes', 'orangutans', 'monkeys'],
            y: [20, 14, 23],
            type: 'bar' }], {
    	margin: { t: 0 } } );
    },
    resizeWindow() {

    },
    attached() {
        that = this;
        window.addEventListener("resize", this.resizeWindow);
        this.initChart();
    },
    detached() {
        window.removeEventListener("resize", this.resizeWindow);
    }
});
