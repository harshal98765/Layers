import { useEffect, useRef } from 'react'
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl'

import '../styles/Ribbons.css'

const Ribbons = ({
  colors = ['#FC8EAC'],
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 30,
  offsetFactor = 0.05,
  maxAge = 500,
  pointCount = 50,
  speedMultiplier = 0.5,
  enableFade = true,
  enableShaderEffect = false,
  effectAmplitude = 2,
  backgroundColor = [0, 0, 0, 0],
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true })
    const gl = renderer.gl

    gl.clearColor(...backgroundColor)
    gl.canvas.style.position = 'absolute'
    gl.canvas.style.top = 0
    gl.canvas.style.left = 0
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    gl.canvas.style.pointerEvents = 'none'
    gl.canvas.style.zIndex = '9999'
    container.appendChild(gl.canvas)

    const scene = new Transform()
    const lines = []

    const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      varying vec2 vUV;

      vec4 getPosition() {
        vec4 current = vec4(position, 1.0);
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;
        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;
        normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
        float dist = length(nextScreen - prevScreen);
        normal *= smoothstep(0.0, 0.02, dist);
        float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
        float pixelWidth = current.w * pixelWidthRatio;
        normal *= pixelWidth * uThickness;
        current.xy -= normal * side;
        if (uEnableShaderEffect > 0.5) {
          current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
        }
        return current;
      }

      void main() {
        vUV = uv;
        gl_Position = getPosition();
      }
    `

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
        float fadeFactor = 1.0;
        if (uEnableFade > 0.5) {
          fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
        }
        gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `

    function resize() {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      lines.forEach((line) => line.polyline.resize())
    }

    window.addEventListener('resize', resize)

    const center = (colors.length - 1) / 2
    colors.forEach((color, index) => {
      const spring = baseSpring + (Math.random() - 0.5) * 0.01
      const friction = baseFriction + (Math.random() - 0.5) * 0.01
      const thickness = baseThickness + (Math.random() - 0.5) * 2

      const mouseOffset = new Vec3(
        (index - center) * offsetFactor,
        0,
        0
      )

      const line = {
        spring,
        friction,
        mouseVelocity: new Vec3(),
        mouseOffset,
        points: Array.from({ length: pointCount }, () => new Vec3())
      }

      line.polyline = new Polyline(gl, {
        points: line.points,
        vertex,
        fragment,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: thickness },
          uOpacity: { value: 1.0 },
          uTime: { value: 0.0 },
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
          uEffectAmplitude: { value: effectAmplitude },
          uEnableFade: { value: enableFade ? 1.0 : 0.0 },
        },
      })

      line.polyline.mesh.setParent(scene)
      lines.push(line)
    })

    resize()

    const mouse = new Vec3(0, 0, 0)

    const updateMouse = (e) => {
      let x, y
      const rect = container.getBoundingClientRect()
      if (e.touches && e.touches.length) {
        x = e.touches[0].clientX - rect.left
        y = e.touches[0].clientY - rect.top
      } else {
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }

      const width = container.clientWidth
      const height = container.clientHeight
      mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0)
    }

    window.addEventListener('mousemove', updateMouse)
    window.addEventListener('touchmove', updateMouse)

    const tmp = new Vec3()
    let lastTime = performance.now()

    const update = () => {
      requestAnimationFrame(update)
      const now = performance.now()
      const dt = now - lastTime
      lastTime = now

      lines.forEach((line) => {
        tmp.copy(mouse)
          .add(line.mouseOffset)
          .sub(line.points[0])
          .multiply(line.spring)
        line.mouseVelocity.add(tmp).multiply(line.friction)
        line.points[0].add(line.mouseVelocity)

        for (let i = 1; i < line.points.length; i++) {
          const alpha = Math.min(1, (dt * speedMultiplier) / (maxAge / pointCount))
          line.points[i].lerp(line.points[i - 1], alpha)
        }

        if (line.polyline.mesh.program.uniforms.uTime) {
          line.polyline.mesh.program.uniforms.uTime.value = now * 0.001
        }

        line.polyline.updateGeometry()
      })

      renderer.render({ scene })
    }

    update()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', updateMouse)
      window.removeEventListener('touchmove', updateMouse)
      if (gl.canvas && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas)
      }
    }
  }, [
    colors,
    baseSpring,
    baseFriction,
    baseThickness,
    offsetFactor,
    maxAge,
    pointCount,
    speedMultiplier,
    enableFade,
    enableShaderEffect,
    effectAmplitude,
    backgroundColor,
  ])

  return <div ref={containerRef} className="ribbons-container" />
}

export default Ribbons
