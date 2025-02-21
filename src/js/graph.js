// creates config file for chart library which is located in chartView.js

export const createBubbleChart = function(rawData) {
    let month = parseInt(rawData[0].day.substring(2, 4), 10);
    let year = parseInt(rawData[0].day.substring(4, 8), 10);

    let allDays = rawData.map(entry => parseInt(entry.day.substring(0, 2), 10));
    let startDay = Math.min(...allDays);
    const minDays = 7;
    let uniqueDays = [];
    let daysInMonth = new Date(year, month, 0).getDate();



    // Generate at least 7 days in the x-axis, extending into the next month if necessary
    for (let i = 0; i < minDays; i++) {
        let newDay = startDay + i; //adds new day
        uniqueDays.push(newDay);
    }


    // Create a mapping for visual labels: replace `32, 33` with `1, 2` visually
    const labels = uniqueDays.map(day => (day > daysInMonth ? `${day - daysInMonth}` : `${day}`));

    // Ensure dataset x-values match `uniqueDays`
    const datasets = rawData.map((entry) => {
        let rawDay = parseInt(entry.day.substring(0, 2), 10);
        let xValue = uniqueDays.find(d => d % daysInMonth === rawDay % daysInMonth) || rawDay;

        const dataPoints = entry.times.map((time) => {
            const [hours, minutes, seconds] = time.split(':').map(Number);
            const timeInHours = hours + minutes / 60 + seconds / 3600;
            return {
                x: xValue, // Maintain numeric x-values for correct spacing
                y: timeInHours,
                r: 10, // Bubble size
            };
        });

        return {
            label: `Day ${rawDay}`,
            data: dataPoints,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
        };
    });

    const config = {
        type: 'bubble',
        data: {
            datasets: datasets,
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Bubble Chart: Time of Activity `,// in ${month < 10 ? '0' + month : month}-${year}
                },
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Day of the Month',
                    },
                    ticks: {
                        callback: function(value) {
                            let index = uniqueDays.indexOf(value);
                            return index !== -1 ? labels[index] : value; // Replace `32, 33` with `1, 2`
                        },
                        stepSize: 1,  // Ensures x-axis increments in whole numbers
                        autoSkip: false, // Ensures all labels are shown
                    },
                    min: Math.min(...uniqueDays), // Minimum x-axis value
                    max: Math.max(...uniqueDays), 
                },
                y: {
                    title: {
                        display: true,
                        text: 'Time (24-Hour Range)',
                    },
                    min: 0,
                    max: 24,
                    ticks: {
                        callback: (value) => `${value}:00`,
                    },
                },
            },
        },
    };

    return config;
};
