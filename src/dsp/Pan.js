import { AudioletNode } from '../core/AudioletNode';
import { AudioletParameter } from '../core/AudioletParameter';

/**
 * Position a single-channel input in stereo space
 *
 * **Inputs**
 *
 * - Audio
 * - Pan Position
 *
 * **Outputs**
 *
 * - Panned audio
 *
 * **Parameters**
 *
 * - pan The pan position.  Values between 0 (hard-left) and 1 (hard-right).
 * Linked to input 1.
 */
class Pan extends AudioletNode {

  /*
   * @constructor
   * @extends AudioletNode
   * @param {Audiolet} audiolet The audiolet object.
   * @param {Number} [pan=0.5] The initial pan position.
   */
  constructor(audiolet, pan) {
    super(audiolet, 2, 1);
    // Hardcode two output channels
    this.setNumberOfOutputChannels(0, 2);
    if (pan == null) {
      var pan = 0.5;
    }
    this.pan = new AudioletParameter(this, 1, pan);
  }

  /**
   * Process samples
   */
  generate() {
    var input = this.inputs[0];
    var output = this.outputs[0];

    var pan = this.pan.getValue();

    var value = input.samples[0] || 0;
    var scaledPan = pan * Math.PI / 2;
    output.samples[0] = value * Math.cos(scaledPan);
    output.samples[1] = value * Math.sin(scaledPan);
  }

  /**
   * toString
   *
   * @return {String} String representation.
   */
  toString() {
    return 'Stereo Panner';
  }

}

export default { Pan };
