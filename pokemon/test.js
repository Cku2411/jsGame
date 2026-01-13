import { TILE_SIZE, HALF_TILE } from "../main.js";
import { Vector2 } from "../utils/vector2.js";
import { GameObject } from "./GameObjects.js";

export class Sprite extends GameObject {
  constructor({
    position,
    resource,
    frameSize,
    scale = 1,
    hFrames = 1,
    vFrames = 1,
    frame = 0,
    animations = null,
    frameInterval = 120,
  }) {
    super({ position });

    this.resource = resource;
    this.scale = scale;
    this.hFrames = hFrames;
    this.vFrames = vFrames;
    this.frameInterval = frameInterval;

    // Animation state
    this.currentFrame = frame;
    this.elapsedTime = 0;
    this.animations = animations;
    this.currentAnimation = null;

    // Dimensions - calculated when image loads
    this.frameSize = frameSize;
    this.width = 0;
    this.height = 0;
    this.halfWidth = 0;

    // Calculate initial dimensions if image is loaded
    this._calculateDimensions();
  }

  /**
   * Calculate sprite dimensions based on loaded image
   */
  _calculateDimensions() {
    if (!this.resource?.isLoaded || !this.resource.image) return;

    const img = this.resource.image;

    // Auto-detect frame size if not provided
    if (!this.frameSize) {
      this.frameSize = {
        x: img.width / this.vFrames,
        y: img.height / this.hFrames,
      };
    }

    this.width = this.frameSize.x * this.scale;
    this.height = this.frameSize.y * this.scale;
    this.halfWidth = this.width / 2;
  }

  /**
   * Get current frame position in sprite sheet
   */
  _getFramePosition() {
    // For single sprite (no animation)
    if (this.hFrames === 1 && this.vFrames === 1) {
      return { x: 0, y: 0 };
    }

    // For custom animation with sprite config
    if (this.currentAnimation) {
      return {
        x: this.currentAnimation.x,
        y:
          this.currentAnimation.y +
          this.currentAnimation.height * this.currentFrame,
      };
    }

    // For grid-based sprite sheet
    const col = this.currentFrame % this.vFrames;
    const row = Math.floor(this.currentFrame / this.vFrames);

    return {
      x: col * this.frameSize.x,
      y: row * this.frameSize.y,
    };
  }

  /**
   * Get total frame count
   */
  _getFrameCount() {
    if (this.currentAnimation?.frameCount) {
      return this.currentAnimation.frameCount;
    }
    return this.hFrames * this.vFrames;
  }

  /**
   * Set animation by name
   */
  setAnimation(name) {
    if (!this.animations || !this.animations[name]) {
      console.warn(`Animation "${name}" not found`);
      return;
    }

    // Don't restart if already playing this animation
    if (this.currentAnimation === this.animations[name]) {
      return;
    }

    this.currentAnimation = this.animations[name];
    this.currentFrame = 0;
    this.elapsedTime = 0;
  }

  /**
   * Set specific frame
   */
  setFrame(frame) {
    const maxFrame = this._getFrameCount();
    this.currentFrame = Math.max(0, Math.min(frame, maxFrame - 1));
  }

  /**
   * Update animation frame
   */
  update(deltaTime) {
    if (!deltaTime) return;

    // Skip animation for single frame sprites
    const frameCount = this._getFrameCount();
    if (frameCount <= 1) return;

    this.elapsedTime += deltaTime;

    if (this.elapsedTime >= this.frameInterval) {
      this.currentFrame = (this.currentFrame + 1) % frameCount;
      this.elapsedTime -= this.frameInterval;
    }
  }

  /**
   * Draw sprite to canvas
   */
  draw(ctx) {
    if (!this.resource?.isLoaded) return;

    // Calculate dimensions if not done yet
    this._calculateDimensions();

    const framePos = this._getFramePosition();
    const drawX = this.position.x + HALF_TILE - this.halfWidth;
    const drawY = this.position.y + TILE_SIZE - this.height;

    ctx.drawImage(
      this.resource.image,
      framePos.x,
      framePos.y,
      this.frameSize.x,
      this.frameSize.y,
      drawX,
      drawY,
      this.width,
      this.height
    );

    // Debug: Draw bounding box (uncomment to use)
    // this._drawDebugBox(ctx, drawX, drawY);
  }

  /**
   * Draw debug bounding box
   */
  _drawDebugBox(ctx, x, y) {
    ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, this.width, this.height);
  }

  /**
   * Get sprite bounds for collision detection
   */
  getBounds() {
    return {
      x: this.position.x + HALF_TILE - this.halfWidth,
      y: this.position.y + TILE_SIZE - this.height,
      width: this.width,
      height: this.height,
    };
  }
}

/**
 * Usage Examples:
 *
 * // 1. Single static sprite
 * const sprite = new Sprite({
 *   position: new Vector2(0, 0),
 *   resource: imageResource,
 * });
 *
 * // 2. Grid-based sprite sheet (4x4 grid)
 * const sprite = new Sprite({
 *   position: new Vector2(0, 0),
 *   resource: imageResource,
 *   hFrames: 4,
 *   vFrames: 4,
 *   frameInterval: 100,
 * });
 *
 * // 3. Custom animations
 * const sprite = new Sprite({
 *   position: new Vector2(0, 0),
 *   resource: imageResource,
 *   animations: {
 *     idle: { x: 0, y: 0, width: 32, height: 32, frameCount: 4 },
 *     walk: { x: 0, y: 32, width: 32, height: 32, frameCount: 6 },
 *     jump: { x: 0, y: 64, width: 32, height: 32, frameCount: 3 },
 *   },
 * });
 * sprite.setAnimation('walk');
 *
 * // 4. Custom frame size
 * const sprite = new Sprite({
 *   position: new Vector2(0, 0),
 *   resource: imageResource,
 *   frameSize: { x: 64, y: 64 },
 *   hFrames: 2,
 *   vFrames: 2,
 *   scale: 2,
 * });
 */
