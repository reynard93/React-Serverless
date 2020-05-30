import {
	filter,
	takeWhile,
	exhaustMap,
	take,
	tap
} from "rxjs/operators";

function keyPressed(key, keyHandler) {
	return keyHandler.pipe(
		tap((pressedKey) => console.log('typed key/pressedKey, key', pressedKey, key)),
		filter(pressedKey => pressedKey === key)
	);
}

export function keyCombo(keyCombo, keyHandler) {
	console.log('i should be triggered on each next quesitonm', keyCombo)
	const comboInitiator = keyCombo[0];

	if (keyCombo.length === 1) {
		return keyPressed(comboInitiator, keyHandler).pipe(
				take(1)
		);
	}

	return keyPressed(comboInitiator, keyHandler).pipe(
			exhaustMap(() => {
				return keyHandler.pipe(
						// takeUntil(timer(2000)), // when trigger combo, allow 3 seconds to answer, or will just be unsub'd when next ques
						takeWhile((keyPressed, index) => keyCombo[index + 1] === keyPressed),
						// skip(keyCombo.length - 1), // only want to take the last one
						tap((key) => console.log('keyy is ', key)),
						take(1) // will onyl pass to subscribe response if combo successful
				);
			})
	)
}

