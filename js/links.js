const links = {
  "parse-server": {
    image: "https://parseplatform.org/img/cloudcode.svg",
  },
  "Parse-SDK-iOS-OSX": {
    name: "Objective-C",
    image: "https://parseplatform.org/img/ios.svg",
    guides: [
      {
        name: "iOS Guide",
        link: "https://docs.parseplatform.org/ios/guide/",
      },
      {
        name: "macOS Guide",
        link: "https://docs.parseplatform.org/macos/guide/",
      },
    ],
    modules: [{ name: "Live Query", link: "https://github.com/parse-community/ParseLiveQuery-iOS-OSX" }],
  },
  "Parse-SDK-Android": {
    image: "https://parseplatform.org/img/android.svg",
    name: "Android",
    guide: "https://docs.parseplatform.org/android/guide/",
    modules: [
      { name: "Parse UI", link: "https://github.com/parse-community/ParseUI-Android" },
      { name: "Live Query", link: "https://github.com/parse-community/ParseLiveQuery-Android" },
    ],
  },
  "Parse-SDK-JS": {
    image: "https://parseplatform.org/img/javascript.svg",
    guide: "https://docs.parseplatform.org/js/guide/",
    name: "JavaScript",
  },
  "Parse-Swift": {
    image: "https://parseplatform.org/img/swiftColour.svg",
    guide: "https://github.com/parse-community/Parse-Swift#usage-guide",
    name: "Swift",
  },
  "Parse-SDK-Flutter": [
    {
      image: "https://parseplatform.org/img/flutter.svg",
      guide: "https://docs.parseplatform.org/flutter/guide/",
      api: "https://parseplatform.org/Parse-SDK-Flutter/flutter/flutter_parse_sdk_flutter/flutter_parse_sdk_flutter-library.html",
      name: "Flutter",
    },
    {
      image: "https://parseplatform.org/img/dart.svg",
      guide: "https://docs.parseplatform.org/dart/guide/",
      api: "https://parseplatform.org/Parse-SDK-Flutter/flutter/flutter_parse_sdk_flutter/flutter_parse_sdk_flutter-library.html",
      name: "Dart",
    },
  ],
  "parse-php-sdk": {
    image: "https://parseplatform.org/img/php.svg",
    guide: "https://docs.parseplatform.org/php/guide/",
    api: "https://parseplatform.org/parse-php-sdk/",
    name: "PHP",
  },
  "Parse-SDK-dotNET": [
    {
      image: "https://parseplatform.org/img/net.svg",
      guide: "https://docs.parseplatform.org/dotnet/guide/",
      name: ".NET + Xaramin",
    },
    {
      image: "https://parseplatform.org/img/unity.svg",
      guide: "https://docs.parseplatform.org/unity/guide/",
      name: "Unity",
    },
  ],
  "Parse-SDK-Arduino": {
    image: "https://parseplatform.org/img/arduino.svg",
    guide: "https://docs.parseplatform.org/arduino/guide/",
    name: "Arduino",
  },
  "parse-embedded-sdks": {
    image: "https://parseplatform.org/img/c.svg",
    guide: "https://docs.parseplatform.org/embedded_c/guide/",
    name: "Embedded C",
  },
};
const additionalMeta = [
  {
    name: "Cloud Code",
    image: "https://parseplatform.org/img/cloudcode.svg",
    guide: "https://docs.parseplatform.org/cloudcode/guide/",
  },
  {
    name: "REST API",
    image: "https://parseplatform.org/img/rest.svg",
    guide: "https://docs.parseplatform.org/rest/guide/",
  },
  {
    name: "GraphQL API",
    image: "https://parseplatform.org/img/graphql.svg",
    guide: "https://docs.parseplatform.org/graphql/guide/",
  },
];

jQuery(function ($) {
  if (!gitJson) {
    return;
  }
  gitJson = gitJson.sort((a, b) => b.stargazers_count - a.stargazers_count);
  const formatNumber = new Intl.NumberFormat().format;
  for (const git of gitJson) {
    const title = git.name;
    const stars = parseInt(git.stargazers_count);
    const forks = parseInt(git.forks_count);
    const meta = links[title];
    if (!meta) {
      continue;
    }
    for (const metaData of Array.isArray(meta) ? meta : [meta]) {
      const formattedTitle = title
        .split("-")
        .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
        .join(" ");
      const guideLink = metaData.guides
        ? `
      <div class="repoLink expandableRepoLink">
        <p>Guides</p>
        <ul>
          ${metaData.guides.map((row) => `<a href="${row.link}" target="_blank"><li>${row.name}</li></a>`).join("")}
        </ul>
      </div>`
        : `
      <a href="${metaData?.guide || `https://docs.parseplatform.org/${title}/guide/`}" target="_blank">
        <div class="repoLink">
          <p>Guide</p>
        </div>
      </a>`;
      const modules = metaData.modules
        ? `
      <div class="repoLink expandableRepoLink">
        <p>Modules</p>
        <ul>
          ${metaData.modules.map((row) => `<a href="${row.link}" target="_blank"><li>${row.name}</li></a>`).join("")}
        </ul>
      </div>`
        : ``;
      const text = `
    <div class="repo">
      <div class="repoTitle">
          <img src="${metaData.image}" alt="" class="SDKLogo">
          <h4>${metaData.name || formattedTitle}</h4>
          <p>
            <span>
              <img src="img/starsDark.svg" alt="" class="icon">
              <span class="sdkRepoStar">${formatNumber(stars)}</span>
            </span>
            <span>
              <img src="img/forksDark.svg" alt="" class="icon">
              <span class="sdkRepoFork">${formatNumber(forks)}</span>
            </span>
          </p>
      </div>
      ${guideLink}
      <a href="${metaData.api || `//parse-community.github.io/${title}/api/`}" target="_blank">
          <div class="repoLink">
              <p>API Reference</p>
          </div>
      </a>
      <a href="//github.com/parse-community/${title}/releases/latest" target="_blank" class="latestRelease">
          <div class="repoLink">
              <p>Latest Release</p>
          </div>
      </a>
      ${modules}
      <div class="repoButton">
          <a href="//github.com/parse-community/${title}" target="_blank">
              <button class="outline">View on GitHub</button>
          </a>
      </div>
  </div>`;
      $(".repoRow").append(text);
    }
  }

  for (const row of additionalMeta) {
    const text = `
  <div class="repo">
    <div class="repoTitle">
        <img src="${row.image}" alt="" class="SDKLogo">
        <h4>${row.name}</h4>
    </div>
    <a href="${row.guide}" target="_blank">
        <div class="repoLink">
          <p>Guide</p>
        </div>
    </a>
</div>`;
    $(".repoRow").append(text);
  }

  $(".expandableRepoLink").on("click", function () {
    const clicked = $(this);
    $(".expandableRepoLink").not(clicked).removeClass("expanded");
    clicked.toggleClass("expanded");
  });
});
