# 🍬 Candy Crusher

> A delightful match-3 puzzle game built with pure HTML, CSS, and vanilla JavaScript

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## ✨ Features

- **Pure Vanilla Stack** - No frameworks, no dependencies, just clean web tech
- **8x8 Grid** - Classic match-3 board size
- **6 Candy Types** - Colorful emoji candies: 🍬, 🍭, 🍫, 🍩, 🍪, 🧁
- **Smooth Animations** - Match pop and gravity fall effects
- **Score Tracking** - Points for every match
- **Move Counter** - Track your puzzle-solving efficiency
- **Responsive Design** - Works on desktop and mobile browsers
- **Instant Play** - Just open `index.html` - no build step needed

## 🎮 How to Play

1. **Click** a candy to select it (it will highlight)
2. **Click** an adjacent candy to swap them
3. **Match 3+** candies in a row or column to clear them
4. **Score points** - 10 points per matched candy
5. **Watch** new candies fall from above automatically
6. **Repeat** and try to beat your high score!

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/candy-crusher.git
cd candy-crusher

# Open in browser
open index.html
# or simply double-click index.html in your file explorer
```

## 🏗️ Architecture

```
candy-crusher/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── src/
│   └── game.js        # Game logic and state management
└── README.md          # This file
```

### Core Game Logic

The game implements a complete match-3 engine:

- **Grid Management**: 8x8 array with candy objects
- **Swap System**: Click-based selection with adjacency validation
- **Match Detection**: Horizontal and vertical pattern recognition
- **Gravity Engine**: Automatic candy falling and refill
- **Score System**: Real-time scoring with visual feedback

## 🎨 Visual Design

- **Gradient Background**: Modern purple-blue aesthetic
- **Colorful Candies**: Each candy type has unique gradient styling
- **Smooth Animations**: 
  - `matchPop` - Candy explosion effect
  - `fall` - Gravity animation for new candies
- **Interactive Feedback**: Hover effects, selection highlighting

## 🔧 Technical Details

### Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

### Performance
- Pure DOM manipulation (no canvas)
- Efficient grid updates
- Minimal reflows
- Smooth 60fps animations

## 📸 Screenshots

![Candy Crusher Gameplay](https://via.placeholder.com/400x400/667eea/ffffff?text=Candy+Crusher+Gameplay)

*Colorful match-3 gameplay with smooth animations*

## 🛠️ Development

### Code Structure
- **Modular**: Clear separation of concerns
- **Readable**: Well-commented, beginner-friendly code
- **Maintainable**: Easy to extend with new features

### Future Enhancements
- [ ] Power-ups and special candies
- [ ] Level progression
- [ ] Timer mode
- [ ] Sound effects
- [ ] High score persistence
- [ ] Combo multipliers

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 🙏 Acknowledgments

- Built with ❤️ for the love of puzzle games
- Inspired by classic match-3 games
- Emoji candy sprites from Unicode

---

**Happy Crushing!** 🍬✨