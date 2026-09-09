# WebGLChallengeWeek3
Three.js Perspective vs Orthographic Cameras

Estimated Time: 40 Minutes

Learning Goal

Students will discover the visual differences between a PerspectiveCamera and an OrthographicCamera by creating a scene and switching between the two cameras.

Scenario

A video game company wants to know which camera is better for their next game.

Your team has been hired to build a demonstration scene and compare both cameras.

You must create a scene that clearly shows the strengths and weaknesses of each camera.

Requirements
Part 1: Create the Scene 

You already have a Three.js scene containing:

At least 5 cubes
At least 1 sphere
A ground plane

After the starter works, you are required to:

 Make a simple scene I can understand
Make sure to place objects at different distances.

The objects should be spread along the z-axis so the distance becomes obvious.

Part 2: Perspective Camera

Create a Perspective Camera.

Example:

const perspectiveCamera =
new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
   100
);

Position it so all objects are visible.

perspectiveCamera.position.set(0,5,15);

Observe:

Which objects appear largest?
Which appear smallest?
How realistic does the scene look?
Part 3: Orthographic Camera

Create an Orthographic Camera.

Example:

const orthoCamera =
    new THREE.OrthographicCamera(
    -10,
     10,
     10,
    -10,
     0.1,
     100
);

Position it in the same location.

orthoCamera.position.set(0,5,15);

Observe:

What changed?
Do distant objects appear smaller?
Does the scene look realistic?
Part 4: Camera Switching (10 minutes)

Allow the user to switch cameras.

Keyboard Controls
P = Perspective
O = Orthographic

Display which camera is active.

Example:

Current Camera:
Perspective

or

Current Camera:
Orthographic
Part 5: Investigation Questions (10 minutes)

Students answer questions in a text file or discussion post.

Question 1

When using the Perspective Camera, what happens to objects farther away?

Question 2

When using the Orthographic Camera, what happens to object size as distance increases?

Question 3

Which camera looks more like real life?

Explain why.

Question 4

Which camera would be best for:

A. First-Person Shooter

Why?

B. Technical Blueprint Software

Why?

C. Strategy Game such as Civilization

Why?

Question 5

What is the biggest advantage of Orthographic cameras?

Bonus Challenge

Add OrbitControls.

Students should be able to:

Rotate
Zoom
Pan

around the scene.

Then answer:

Does the difference between Perspective and Orthographic become more obvious when the camera moves?

Deliverables

Students submit GitHub URL:

Source Files
index.html
main.js
Screenshot 1

Perspective Camera

Screenshot 2

Orthographic Camera

Reflection

3-5 sentences summarizing:

Which camera they preferred
Which camera seemed more useful
What they learned about the differences
Grading Rubric (20 Points)
Criteria	Points
Scene contains required objects	2
Perspective camera works	2
Orthographic camera works	2
Camera switching works	2
Reflection completed	2
Extra Credit	2

Total: 20 Points

Success Criteria

A successful project clearly demonstrates that:

Perspective cameras make distant objects appear smaller, while orthographic cameras keep object sizes consistent regardless of distance.

This difference should be immediately visible when switching between the two cameras.
