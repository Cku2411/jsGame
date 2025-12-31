class StoryFlag {
  constructor() {
    this.flags = new Map();
  }

  add(flag) {
    this.flags.set(flag, true);
  }

  getReleventScenario(scenarios = []) {
    return scenarios.find((senario) => {
      // Disqualify when any bypas flags present
      const bypassFlags = senario.bypass ?? [];
      for (let i = 0; i < bypassFlags; i++) {
        const thisFlag = bypassFlags[i];
        if (this.flags.has(thisFlag)) {
          return false;
        }
      }

      //   Disqualify if we find a missing required flag
      const requiredFlags = senario.requires ?? [];
      for (let i = 0; i < requiredFlags; i++) {
        const thisFlag = requiredFlags[i];
        if (!this.flags.has(thisFlag)) {
          return false;
        }
      }
      return true;
    });
  }
}

export const TALK_TO_NPC_A = "TALK_TO_NPC_A";
export const TALK_TO_NPC_B = "TALK_TO_NPC_B";
export const storyFlag = new StoryFlag();
