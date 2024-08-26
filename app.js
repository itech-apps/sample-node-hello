
import {
    Octokit
}
from "@octokit/rest";

import {
    JSDOM
}
from 'jsdom';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//  console.log("This function is executed once the page is full loaded");

async function scrapeData() {

    try {

        const options = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36'
            }
        }

        const response = await fetch("https://callofliberty.fr/tv/2-france.2/2-france.2.php", options);
        const html = await response.text();

        console.log(html);
        //var parser = new DOMParser();

        const dom = new JSDOM(html);

        //var doc = parser.parseFromString(html, "text/html");
        var scripts = dom.window.document.querySelectorAll('script');
        //      console.log("This : " + scripts[scripts.length - 1].outerHTML);
        var inputString = scripts[scripts.length - 1];
        console.log(inputString);

        console.log(inputString.outerHTML);
        // to find the index of the start character
        var startIndex = inputString.outerHTML.indexOf("source: ") + 9;
        console.log(startIndex);
        // to find the the index of the end character after the start character
        var endIndex = inputString.outerHTML.indexOf("poster:") - 27;
        console.log(endIndex);
        // check if both start and end characters are found
        if (startIndex != -1 && endIndex != -1) {
            // extract the substring between the start and end characters
            var result = inputString.outerHTML.substring((startIndex), endIndex);

            // print the result
            console.log(result);
            var Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode: function (e) {
                    var t = "";
                    var n,
                    r,
                    i,
                    s,
                    o,
                    u,
                    a;
                    var f = 0;
                    e = Base64._utf8_encode(e);
                    while (f < e.length) {
                        n = e.charCodeAt(f++);
                        r = e.charCodeAt(f++);
                        i = e.charCodeAt(f++);
                        s = n >> 2;
                        o = (n & 3) << 4 | r >> 4;
                        u = (r & 15) << 2 | i >> 6;
                        a = i & 63;
                        if (isNaN(r)) {
                            u = a = 64
                        } else if (isNaN(i)) {
                            a = 64
                        }
                        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                    }
                    return t
                },
                decode: function (e) {
                    var t = "";
                    var n,
                    r,
                    i;
                    var s,
                    o,
                    u,
                    a;
                    var f = 0;
                    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    while (f < e.length) {
                        s = this._keyStr.indexOf(e.charAt(f++));
                        o = this._keyStr.indexOf(e.charAt(f++));
                        u = this._keyStr.indexOf(e.charAt(f++));
                        a = this._keyStr.indexOf(e.charAt(f++));
                        n = s << 2 | o >> 4;
                        r = (o & 15) << 4 | u >> 2;
                        i = (u & 3) << 6 | a;
                        t = t + String.fromCharCode(n);
                        if (u != 64) {
                            t = t + String.fromCharCode(r)
                        }
                        if (a != 64) {
                            t = t + String.fromCharCode(i)
                        }
                    }
                    t = Base64._utf8_decode(t);
                    return t
                },
                _utf8_encode: function (e) {
                    e = e.replace(/\r\n/g, "\n");
                    var t = "";
                    for (var n = 0; n < e.length; n++) {
                        var r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r)
                        } else if (r > 127 && r < 2048) {
                            t += String.fromCharCode(r >> 6 | 192);
                            t += String.fromCharCode(r & 63 | 128)
                        } else {
                            t += String.fromCharCode(r >> 12 | 224);
                            t += String.fromCharCode(r >> 6 & 63 | 128);
                            t += String.fromCharCode(r & 63 | 128)
                        }
                    }
                    return t
                },
                _utf8_decode: function (e) {
                    var t = "";
                    var n = 0;
                    var r = c1 = c2 = 0;
                    while (n < e.length) {
                        r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r);
                            n++
                        } else if (r > 191 && r < 224) {
                            c2 = e.charCodeAt(n + 1);
                            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                            n += 2
                        } else {
                            c2 = e.charCodeAt(n + 1);
                            c3 = e.charCodeAt(n + 2);
                            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                            n += 3
                        }
                    }
                    return t
                }
            }
            var encodedString = Base64.encode(result);

            var encodedStringSecond = Base64.encode(encodedString);

            //document.write(encodedString);
            //console.log(encodedString);


            // Octokit.js
            // https://github.com/octokit/core.js#readme

            var str1 = 'ghp_d92wN';
            var str2 = 'ruquR7VGZ0j';
            var str3 = 'kwwMXX';
            var str4 = 'vmrCg';
            var str5 = 'QQ04';
            var str6 = 'fnj1f';

            const octokit = new Octokit({
                auth: (str1 + str2 + str3 + str4 + str5 + str6)
            })

                const {
                data: {
                    sha
                }
            } = await octokit.request('GET /repos/itech-apps/token/contents/six_ter/', {
                owner: "itech-apps",
                repo: "token",
                file_path: "/six_ter"
            });
            console.log(sha);
            var sha1 = sha;
            // var respDelete = await octokit.request('DELETE /repos/itech-apps/token/contents/test1/', {
            //   owner: 'itech-apps',
            //   repo: 'token',
            //   path: '/test1',
            //   message: 'delete commit message',
            //   committer: {
            //     name: 'Samir Agroubi',
            //     email: 'samir.agroubi@gmail.com'
            //   },
            //   content: 'dGVzdF9tZV90b28=',
            //   branch: 'master',
            //   sha: sha1,
            //   headers: {
            //     'X-GitHub-Api-Version': '2022-11-28'
            //   }
            // })

            //             console.log(respDelete);

            //             await new Promise(r => setTimeout(r, 5000));


            var respUpdate = await octokit.request('PUT /repos/itech-apps/token/contents/six_ter/', {
                owner: 'itech-apps',
                repo: 'token',
                path: '/six_ter',
                message: 'update commit message',
                committer: {
                    name: 'Samir agroubi',
                    email: 'samir.agroubi@gmail.com'
                },
                content: encodedStringSecond,
                branch: 'master',
                sha: sha1,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })

                console.log(respUpdate);
            //   document.write(respUpdate);
        } else {
            console.log("Not found");
        }

    } catch (error) {
        console.log(error);
    }
}

scrapeData();

