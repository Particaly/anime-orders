export default function (instance) {
	instance.defineAnime({
		name: 'fade',
		enter: {
			opacity: [0, 1],
			duration: 300,
			autoplay: false
		},
		leave: {
			opacity: [1, 0],
			duration: 300,
			autoplay: false
		}
	})
	instance.defineAnime({
		name: 'fade-left',
		enter: {
			translateX: [-100, 0],
			opacity: [0, 1],
			duration: 300,
			autoplay: false
		},
		leave: {
			translateX: [0, -100],
			opacity: [1, 0],
			duration: 300,
			autoplay: false
		}
	})
	instance.defineAnime({
		name: 'fade-right',
		enter: {
			translateX: [100, 0],
			opacity: [0, 1],
			duration: 300,
			autoplay: false
		},
		leave: {
			translateX: [0, 100],
			opacity: [1, 0],
			duration: 300,
			autoplay: false
		}
	})
	instance.defineAnime({
		name: 'fade-top',
		enter: {
			translateY: [-100, 0],
			opacity: [0, 1],
			duration: 300,
			autoplay: false
		},
		leave: {
			translateX: [0, -100],
			opacity: [1, 0],
			duration: 300,
			autoplay: false
		}
	})
	instance.defineAnime({
		name: 'fade-bottom',
		enter: {
			translateY: [100, 0],
			opacity: [0, 1],
			duration: 300,
			autoplay: false
		},
		leave: {
			translateY: [0, 100],
			opacity: [1, 0],
			duration: 300,
			autoplay: false
		}
	})
}
