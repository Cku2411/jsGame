class Resources {
  constructor() {
    // everything we plan to draw
    this.toLoad = {
      background: "/data/Images/world.png",
      foreground: "/data/Images/worldforeground.png",
      // heroImg
      shadow: "/data/Images/shadow.png",
      body: "/data/Images/hero3.png",

      // enemies
      enemy1: "/data/Images/enemies/enemy1.png",
      enemy2: "/data/Images/enemies/enemy2.png",
      enemy3: "/data/Images/enemies/enemy3.png",
      enemy4: "/data/Images/enemies/enemy4.png",
      enemy5: "/data/Images/enemies/enemy5.png",
      enemy6: "/data/Images/enemies/enemy6.png",

      // Weapon:
      weapon1: "/data/Images/weapons/katana.png",
      weapon2: "/data/Images/weapons/axe.png",

      // health
      heart: "/data/Images/Ui/Heart.png",

      // weather
      snow: "/data/Images/weather/Snow.png",
    };

    this.images = {};
    this.loadPromises = [];

    // load image
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();

      this.images[key] = {
        image: img,
        isLoaded: false,
      };

      // Create a promise for each image load
      const loadPromise = new Promise((resolve, reject) => {
        img.onload = () => {
          this.images[key].isLoaded = true;
          resolve();
        };

        img.onerror = () => {
          console.error(`Failed to load image: ${this.toLoad[key]}`);
          reject(new Error(`Failed to load image: ${this.toLoad[key]}`));
        };
      });

      this.loadPromises.push(loadPromise);

      // Start loading the image
      img.src = this.toLoad[key];
    });
  }

  // Method to wait for all images to load
  async loadAll() {
    try {
      await Promise.all(this.loadPromises);
      console.log("All images loaded successfully!");
      return true;
    } catch (error) {
      console.error("Some images failed to load:", error);
      return false;
    }
  }

  // Method to check if all images are loaded
  isAllLoaded() {
    return Object.values(this.images).every((img) => img.isLoaded);
  }
}

// create one instance for the whole app to use
export const resources = new Resources();
