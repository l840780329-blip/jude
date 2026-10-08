# 首屏背景素材

## 当前使用

- 用户提供的视频：`public/assets/hero-portfolio-video.mp4`（1280 × 720，约 10 秒），直接复制原文件，静音循环播放。
- 视频首帧封面：`public/assets/hero-portfolio-poster.jpg`。
- 原有放大缩小视频不再被页面引用，网页未添加缩放动画。
- 主视觉交互：基于用户提供的 React Bits GridDistortion 代码适配视频，通过 Three.js VideoTexture 与浮点网格纹理实现鼠标局部扭曲；保留原视频，不修改素材文件。

## 之前的参考图制作记录

- 成品图片：`public/assets/hero-cinematic.png`（1678 × 937）
- 循环背景视频：`public/assets/hero-cinematic-loop.mp4`
- 工具：内置图像生成工具，单次编辑；视频为该图的轻缓镜头运动。
- 参考：用户提供的紫色 Portfolio 封面。

## 最终图像提示词

Use case: precise-object-edit
Asset type: full-width cinematic website hero artwork.
Input image 1 is the EDIT TARGET, not a style reference. Apply a precise text-removal edit with extremely close preservation of the original image.
Primary request: REMOVE ONLY the three groups of small labels at the very top (top-left “2026 · jude” and “Portfolio”; top-center “JUDE’S PORTFOLIO TYPOGRAPHY SHOWCASE”; top-right “Personal work” and “Creative design”) and the small duplicate “Portfolio” and paragraph at bottom center. Seamlessly reconstruct the sparse dark starfield and dark satin-like mountain/fabric folds where those small labels were.
Invariants: Preserve the original landscape approximately 16:9 composition and framing very closely. Keep the luminous lilac/purple vertical elliptical ring centered, filling most of the frame, with its existing glow. Keep the sparse black starfield, dark satin-like mountain folds along the bottom, and especially the large CENTRAL spiky chrome metallic lettering reading exactly “Portfolio”. The central large “Portfolio” must remain with the same exact spelling, letter shapes, size, placement, silvery lilac chrome reflections and appearance. Do not remove, redesign, redraw or replace the central word.
Text (verbatim, retained central word only): “Portfolio”, spelled P-o-r-t-f-o-l-i-o.
Constraints: Change only the specified small top and bottom labels and their immediate underlying pixels. Preserve all other artwork, lighting, textures, ring geometry, star density, and composition. High quality crisp cinematic image; opaque background.
Avoid: Any additional wording, duplicate Portfolio at bottom, watermark, UI, buttons, border, new objects, or stylistic changes.
