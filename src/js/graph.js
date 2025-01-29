

export const createBubbleChart = function(rawData) {
    // Extract the month from the first data entry (3rd and 4th characters in "day")
    let month = parseInt(rawData[0].day.substring(2, 4), 10);
    let year = parseInt(rawData[0].day.substring(4, 8), 10);

    // Get unique days from the data
    let allDays = rawData.map(entry => parseInt(entry.day.substring(0, 2), 10));

    // Ensure a minimum of 7 days in the dataset
    const minDays = 7;
    let uniqueDays = [];
    let startDay = Math.min(...allDays);
    for (let i = 0; i < Math.max(allDays.length, minDays); i++) {
        let day = startDay + i;

        // Handle month transition (if day exceeds the max days in current month)
        let daysInMonth = new Date(year, month, 0).getDate(); // Get max days in the month
        if (day > daysInMonth) {
            day -= daysInMonth; // Start from 1 in the next month
            month += 1;
            if (month > 12) {
                month = 1; // Wrap around to January if December overflows
                year += 1;
            }
        }
        uniqueDays.push(day);
    }

    // Convert data into a format suitable for Chart.js
    const datasets = rawData.map((entry) => {
        let xValue = parseInt(entry.day.substring(0, 2), 10); // Day of the month

        // Convert times to hours for the y-axis
        const dataPoints = entry.times.map((time) => {
            const [hours, minutes, seconds] = time.split(':').map(Number);
            const timeInHours = hours + minutes / 60 + seconds / 3600; // Convert time to hours
            return {
                x: xValue, // Day of the month (adjusted)
                y: timeInHours, // Time in hours
                r: 10, // Double the size of the bubble
            };
        });

        return {
            label: `Day ${xValue}`,
            data: dataPoints,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 0.5)`, // Random color
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
        };
    });

    // Chart.js configuration
    const config = {
        type: 'bubble',
        data: {
            datasets: datasets,
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Bubble Chart: Time of Activity in ${month < 10 ? '0' + month : month}-${year}`,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: `Day of the Month (${month < 10 ? '0' + month : month}-${year})`,
                    },
                    ticks: {
                        callback: (value) => `${value}`, // Display day of the month
                    },
                    min: Math.min(...uniqueDays), // Start from the first available day
                    max: Math.max(...uniqueDays), // End at the last available or min 7 days later
                },
                y: {
                    title: {
                        display: true,
                        text: 'Time (24-Hour Range)',
                    },
                    min: 0,
                    max: 24, // 24-hour range
                    ticks: {
                        callback: (value) => `${value}:00`, // Format as "hour:00"
                    },
                },
            },
        },
    };
    return config


}
