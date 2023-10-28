import React from 'react';
import './../style/GammaStatistics.css'; // Import the CSS file

import wineData from './wine-data.json';

function calculateGammaForData(data) {
    return data.map(point => ({
        ...point,
        Gamma: (point.Ash * point.Hue) / point.Magnesium,
    }));
}

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
    const countMap = {};

    for (const value of arr) {
        countMap[value] = (countMap[value] || 0) + 1;
    }

    let mode = null;
    let maxCount = 0;

    for (const value in countMap) {
        if (countMap[value] > maxCount) {
            maxCount = countMap[value];
            mode = value;
        }
    }

    return mode;
}

const dataWithGamma = calculateGammaForData(wineData);
const classGammaData = calculateClassStatistics(dataWithGamma, 'Gamma');

function GammaStatistics() {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {Object.keys(classGammaData).map(alcoholClass => (
                            <th key={alcoholClass}>Class {alcoholClass}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Gamma Mean</td>
                        {Object.keys(classGammaData).map(alcoholClass => (
                            <td key={alcoholClass}>{calculateMean(classGammaData[alcoholClass]).toFixed(3)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Gamma Median</td>
                        {Object.keys(classGammaData).map(alcoholClass => (
                            <td key={alcoholClass}>{calculateMedian(classGammaData[alcoholClass]).toFixed(3)}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Gamma Mode</td>
                        {Object.keys(classGammaData).map(alcoholClass => (
                            <td key={alcoholClass}>{calculateMode(classGammaData[alcoholClass])}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default GammaStatistics;
