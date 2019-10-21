const pivotal = require("./config/cloud/pivotal");

module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-run");
  grunt.loadNpmTasks("grunt-env");

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: "backend",
            src: [ "controller/**", "constants/**", "models/**", "setup/**", "tools/**", "app.js", "index.js", "package.json", "yarn.lock" ],
            dest: "build/zip/"
          },
          {
            expand: true,
            cwd: "..",
            src: [ "config/**" ],
            dest: "build/zip/"
          },
          {
            expand: true,
            cwd: "frontend/build",
            src: [ "**" ],
            dest: "build/zip/public/react"
          }
        ]
      }
    },
    clean: [ "build" ],
    run: {
      buildFrontend: { exec: "yarn --cwd frontend build" },
      pivotal: { exec: `cd build/zip && cf push ${pivotal.appName} -c "node index.js"` }
    },
    env: {
      pivotal: { NODE_ENV: "production", SERVER_URL: pivotal.serverUrl, PUBLIC_URL: pivotal.frontendUrl }
    }
  });

  // mkdir for zip archive
  grunt.registerTask("mkdir", () => {
    grunt.file.mkdir("build/zip/temp");
    grunt.file.mkdir("build/zip/uploads");
    grunt.file.mkdir("build/zip/public/react");
  });

  grunt.registerTask("pivotal:build", [ "clean", "env:pivotal", "run:buildFrontend", "mkdir", "copy:main" ]);
  grunt.registerTask("pivotal:publish", [ "run:pivotal" ]);
  grunt.registerTask("build:pivotal", [ "pivotal:build", "pivotal:publish" ]);

  grunt.registerTask("copy:files", [ "clean", "copy:main" ]);
};
