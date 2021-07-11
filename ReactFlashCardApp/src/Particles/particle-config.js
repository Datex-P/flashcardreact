const particlesConfig = 

  {
    particles: {
      number: {
        value: 123,
        density: {
          enable: true,
          value_area: 552.4033491425909
        }
      },
      color: {
        value: "#dce6f5"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 3
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.21646062821684559,
        random: false,
        anim: {
          enable: false,
          speed: 0.1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 4.008530152163807,
        random: true,
        anim: {
          enable: false,
          speed: 292.34779642848423,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 130,
        color: "#ffffff",
        opacity: 0.4,
        width: 0.5
      },
      move: {
        enable: true,
        speed: 0.1,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false,
          mode: "repulse"
        },
        onclick: {
          enable: false,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 300,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 100,
          size: 400,
          duration: 1,
          opacity: 0.8445603007933989,
          speed: 1
        },
        repulse: {
          distance: 10,
          duration: 0.4
        },
        push: {
          particles_nb: 2
        },
        remove: {
          particles_nb: 1
        }
      }
    },
    retina_detect: true
  }


  export default particlesConfig
