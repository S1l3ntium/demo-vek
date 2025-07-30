gsap.registerPlugin(ScrollTrigger)

function setupScroller() {
	const scroller = document.querySelector('.scroller')
	const row1 = document.querySelector('.row1')
	const row2 = document.querySelector('.row2')

	// Находим ширину прокрутки строк
	const row1Width = row1.scrollWidth
	const row2Width = row2.scrollWidth
	const viewportWidth = window.innerWidth

	// Расчёт смещения в px
	const move1 = row1Width - viewportWidth
	const move2 = row2Width - viewportWidth

	// Самая длинная прокрутка
	const maxScroll = Math.max(move1, move2)

	// Общая длина скролла (можно добавить множитель для замедления)
	const scrollLength = maxScroll * 1.5

	// ScrollTrigger с pin на всей секции
	ScrollTrigger.create({
		trigger: scroller,
		start: 'top top',
		end: `+=${scrollLength}`,
		pin: true,
		scrub: true,
		anticipatePin: 1,
		onUpdate: self => {
			const progress = self.progress

			// Двигаем обе строки пропорционально их смещению
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
