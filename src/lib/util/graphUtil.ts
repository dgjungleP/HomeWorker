type Line = {
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	length: number;
	direct: 'L' | 'R' | 'T' | 'B';
};

function getLines(edge: dagre.Edge, grafh: dagre.graphlib.Graph): Line[] {
	const simpleLines: Line[] = [];
	const from = grafh.node(edge.v);
	const to = grafh.node(edge.w);
	const fromCenterPoint = getCenterPoint(from, 'B');
	const toCenterPoint = getCenterPoint(to, 'T');
	if (fromCenterPoint.x != toCenterPoint.x) {
		const points: {
			x: number;
			y: number;
		}[] = buildRelationPoint(fromCenterPoint, toCenterPoint);

		for (let i = 1; i < points.length; i++) {
			simpleLines.push(buildLine(points[i - 1], points[i]));
		}
	} else {
		simpleLines.push(buildLine(fromCenterPoint, toCenterPoint));
	}
	return simpleLines;
}

function buildLine(
	from: {
		x: number;
		y: number;
	},
	to: {
		x: number;
		y: number;
	}
): Line {
	return {
		startX: from.x,
		startY: from.y,
		endX: to.x,
		endY: to.y,
		length: getLength(from, to),
		direct: getDirect(from, to)
	};
}
function getLength(
	ponintA: {
		x: number;
		y: number;
	},
	ponintB: {
		x: number;
		y: number;
	}
): number {
	return Math.sqrt(Math.pow(ponintA.x - ponintB.x, 2) + Math.pow(ponintA.y - ponintB.y, 2));
}

function getCenterPoint(
	node: { x: number; y: number; width: number; height: number },
	type: 'L' | 'R' | 'T' | 'B'
): {
	x: number;
	y: number;
} {
	switch (type) {
		case 'L':
			return { x: node.x, y: node.y + node.height / 2 };
		case 'R':
			return { x: node.x + node.width, y: node.y + node.height / 2 };
		case 'T':
			return { x: node.x + node.width / 2, y: node.y };
		case 'B':
			return { x: node.x + node.width / 2, y: node.y + node.height };
	}
}

function buildRelationPoint(
	start: { x: number; y: number },
	end: { x: number; y: number }
): { x: number; y: number }[] {
	const result: { x: number; y: number }[] = [];
	result.push(start);
	result.push({ y: (start.y + end.y) / 2, x: start.x });
	result.push({ y: (start.y + end.y) / 2, x: end.x });
	result.push(end);

	return result;
}
function getDirect(
	from: { x: number; y: number },
	to: { x: number; y: number }
): 'L' | 'R' | 'T' | 'B' {
	if (from.x > to.x) {
		return 'L';
	}
	if (from.x < to.x) {
		return 'R';
	}
	if (from.y > to.y) {
		return 'T';
	}
	if (from.y < to.y) {
		return 'B';
	}
	return 'B';
}

function getLineStyle(line: Line): string {
	switch (line.direct) {
		case 'T':
			return 'height:' + line.length + 'px;transform: translateY(-' + line.length + 'px);';
		case 'B':
			return 'height:' + line.length + 'px;';
		case 'L':
			return 'width:' + line.length + 'px;transform: translateX(-' + line.length + 'px);';
		case 'R':
			return 'width:' + line.length + 'px;';
	}
}
export { getLines, getLineStyle };
export type { Line };
