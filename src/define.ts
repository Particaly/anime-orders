export default function (instance) {
	instance.defineAnime({
		name: 'fade-left',
		enter: {
			translateX: [150, 0],
			opacity: [0, 1],
			duration: 300,
			autoplay: false
		},
		leave: {
			translateX: [0, 150],
			opacity: [1, 0],
			duration: 300,
			autoplay: false
		}
	})
}
