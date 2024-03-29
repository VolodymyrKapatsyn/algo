const pointsList = [
    {
        x:0,
        y:0
    },
    {
        x:0,
        y:5
    },
    {
        x:2,
        y:3
    },
    {
        x:5,
        y:5
    },
    {
        x:5,
        y:0
    }
]

console.log(pointsList)

function check(pointsList) {
    if(pointsList.length < 4) {
        return true
    }

    // prepare LineArray
    const linesArray = generateLinesArray(pointsList)
    console.log(linesArray)

    let flag = true

    for (let i=0; i < linesArray.length; i++) {
        let x
        let y
        let item =  linesArray[i]

        for (let k =0 ; k <  linesArray.length; k++ ){
            if ((i === k) || (i === 0 && (k === 1 || k === linesArray.length -1 ))  ||
                ((1 <= i  &&  i <= linesArray.length -2) && (k === (i +1) || k === (i-1))) ||
                ((i === (linesArray.length -1)) && (k === 0 || k === linesArray.length -2))
            ) {
                continue
            }

            const crossPoint = getCrossPosition(item, linesArray[k])

            if(crossPoint === null) {
                continue
            }
            if (item.secondPoint.x > item.firstPoint.x) {
                if( item.firstPoint.x <= crossPoint.x && crossPoint.x <= item.secondPoint.x) flag = false
            } else if(item.secondPoint.x < item.firstPoint.x)  {
                if( item.firstPoint.x >= crossPoint.x && crossPoint.x >= item.secondPoint.x) flag = false
            } else if(item.firstPoint.x ===  item.secondPoint.x ) { // if line is vertical - check y

                if (item.secondPoint.y > item.firstPoint.y) {
                    if( item.firstPoint.y <= crossPoint.y && crossPoint.y <= item.secondPoint.y) flag = false
                } else if(item.secondPoint.y < item.firstPoint.y) {
                    if (item.firstPoint.y >= crossPoint. y && crossPoint.y >= item.secondPoint.y) flag = false
                }
            }

        }
    }

    console.log(flag)
}

function getCrossPosition(item, sibling1) {
    const x1 = item.firstPoint.x
    const x2 = item.secondPoint.x
    const y1 = item.firstPoint.y
    const y2 = item.secondPoint.y

    const x3 = sibling1.firstPoint.x
    const x4 = sibling1.secondPoint.x
    const y3 = sibling1.firstPoint.y
    const y4 = sibling1.secondPoint.y

    const isLine1Vertical = x1 === x2;
    const isLine2Vertical = x3 === x4;

    if (isLine1Vertical && isLine2Vertical) {
        return null; // Parallel vertical lines or identical, but handled as no single intersection point
    } else if (isLine1Vertical) {
        // Calculate the slope and y-intercept of the second line
        const m2 = (y4 - y3) / (x4 - x3);
        const b2 = y3 - m2 * x3;
        // The x-coordinate of the intersection is the x-coordinate of the vertical line
        const x = x1;
        // Calculate the y-coordinate on the second line using the x-coordinate
        const y = m2 * x + b2;
        return { x, y };
    } else if (isLine2Vertical) {
        // Calculate the slope and y-intercept of the first line
        const m1 = (y2 - y1) / (x2 - x1);
        const b1 = y1 - m1 * x1;
        // The x-coordinate of the intersection is the x-coordinate of the vertical line
        const x = x3;
        // Calculate the y-coordinate on the first line using the x-coordinate
        const y = m1 * x + b1;
        return { x, y };
    } else {
        // Both lines are not vertical, proceed as normal
        const m1 = (y2 - y1) / (x2 - x1);
        const m2 = (y4 - y3) / (x4 - x3);

        if (m1 === m2) {
            return null; // Parallel lines
        }

        const b1 = y1 - m1 * x1;
        const b2 = y3 - m2 * x3;
        const x = (b2 - b1) / (m1 - m2);
        const y = m1 * x + b1; // You can also use m2 and b2

        return { x, y };
    }
}
function generateLinesArray(pointsList) {
    let linesArray = []
    for (let i = 0; i < pointsList.length; i++) {
        let firstPoint = pointsList[i]
        let secondPoint
        if(i == (pointsList.length - 1)) {
            secondPoint = pointsList[0]
        } else {
            secondPoint = pointsList[i+1]
        }

        linesArray.push(
            {
                firstPoint,
                secondPoint,
                formula: ''
            }
        )
    }
    return linesArray
}

check(pointsList)

