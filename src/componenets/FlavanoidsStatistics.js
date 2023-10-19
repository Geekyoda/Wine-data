import React from 'react';
import './FlavanoidsStatistics.css';
import wineData from './wine-data.json';

function calculateClassStatistics(data, propertyName) {
    const classStatistics = {};

    data.forEach(point => {
        const alcoholClass = point.Alcohol;

        if (!classStatistics[alcoholClass]) {
            classStatistics[alcoholClass] = [];
        }

        classStatistics[alcoholClass].push(point[propertyName]);
    });

    return classStatistics;
}

function calculateMean(arr) {
    return arr.reduce((acc, value) => acc + value, 0) / arr.length;
}

function calculateMedian(arr) {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 === 0) {
        return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
    } else {
        return sortedArr[middle];
    }
}

function calculateMode(arr) {
    const counts = {};

    for (const value of arr) {
        counts[value] = (counts[value] || 0) + 1;
    }

    let mode = null;
    let maxCount = 0;

    for (const value in counts) {
        if (counts[value] > maxCount) {
            maxCount = counts[value];
            mode = value;
        }
    }

    return mode;
}

const classFlavanoidsData = calculateClassStatistics(wineData, 'Flavanoids');

function FlavanoidsStatistics() {
    // Render the class-wise statistics in a table

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {Object.keys(classFlavanoidsData).map(alcoholClass => (
                            <th key={alcoholClass}>Class {alcoholClass}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Flavanoids Mean</td>
                        {Object.values(classFlavanoidsData).map(arr => (
                            <td key={arr[0]}>{calculateMean(arr).toFixed(3)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Flavanoids Median</td>
                        {Object.values(classFlavanoidsData).map(arr => (
                            <td key={arr[0]}>{calculateMedian(arr).toFixed(3)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Flavanoids Mode</td>
                        {Object.values(classFlavanoidsData).map(arr => (
                            <td key={arr[0]}>{calculateMode(arr)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default FlavanoidsStatistics;
