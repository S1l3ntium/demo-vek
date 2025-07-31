gsap.registerPlugin(ScrollTrigger)

function setupScroller() {
	const scroller = document.querySelector('.scroller')
	const row1 = document.querySelector('.row1')
	const row2 = document.querySelector('.row2')

	const row1Width = row1.scrollWidth
	const row2Width = row2.scrollWidth
	const viewportWidth = window.innerWidth

	const move1 = row1Width > viewportWidth ? row1Width - viewportWidth : 0
	const move2 = row2Width > viewportWidth ? row2Width - viewportWidth : 0

	const maxScroll = Math.max(move1, move2)
	const scrollLength = maxScroll * 1.5

	ScrollTrigger.create({
		trigger: scroller,
		start: 'top top',
		end: `+=${scrollLength}`,
		pin: true,
		scrub: true,
		anticipatePin: 1,
		invalidateOnRefresh: true,
		onUpdate: self => {
			const progress = self.progress
			gsap.to(row1, { x: -move1 * progress, duration: 0, overwrite: true })
			gsap.to(row2, { x: -move2 * progress, duration: 0, overwrite: true })
		},
	})
}

window.addEventListener('load', setupScroller)
window.addEventListener('resize', () => {
	ScrollTrigger.getAll().forEach(t => t.kill())
	setupScroller()
})
