/**
 * by dickymuliafiqri
 *
 * Convert v2fly geosite community file to openclash rule format
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";

const v2fly_dir = `${process.cwd()}/v2fly-geosite`;
const oc_ruler_dir = `${process.cwd()}/data`;

class OC_RULER {
  private domain_files = readdirSync("./v2fly-geosite/data");

  write() {
    console.log(`Generating rule...`);
    if (!existsSync(oc_ruler_dir)) mkdirSync(oc_ruler_dir);

    this.domain_files.forEach((domains) => {
      const rules = ["payload:"];
      const domain_list: string[] = [];

      try {
        domain_list.push(...readFileSync(`${v2fly_dir}/data/${domains}`).toString().split(/\n/g));
      } catch (e: any) {
        if (e.message.match("no such file")) return;
      }

      for (const i in domain_list) {
        if (domain_list[i].match(/\:/)) {
          domain_list.push(...this.join_file(domain_list[i]));
          delete domain_list[i];
        }
      }

      for (const domain of domain_list) {
        if (!domain) {
          continue;
        } else if (domain.match(/^(#)/)) {
          continue;
        } else if (domain.match(/\s(@|#)/)) {
          rules.push(domain.split(" ").shift() as string);
        } else {
          rules.push(domain);
        }
      }

      for (const i in rules) {
        if (parseInt(i) == 0) continue;

        // Ignore
        if (rules[i].match(/^(\/\/|\s)+/m)) {
          delete rules[i];
          continue;
        }

        if (rules[i].match(/^\^/)) {
          rules.push(`\n  - DOMAIN,${rules[i].replace(/^\^/, "")}`);
        } else if (rules[i].match(/\./)) {
          rules.push(`\n  - DOMAIN-SUFFIX,${rules[i]}`);
        } else {
          rules.push(`\n  - DOMAIN-KEYWORD,${rules[i]}`);
        }

        delete rules[i];
      }
      writeFileSync(`${oc_ruler_dir}/${domains}.yaml`, rules.join(""));
    });
    console.log("Done!");
  }

  join_file(filename: string | any) {
    filename = filename.split(/\:/);
    if (filename[1].match(/\s(@|#)/)) {
      filename[1] = filename[1].split(" ").shift();
    }

    filename[1] = filename[1].replace(/\s$/, "");
    const rules: Array<string> = [];

    switch (filename[0]) {
      case "include":
        const domain_list = readFileSync(`${v2fly_dir}/data/${filename[1]}`).toString().split(/\n/g);
        for (const domain of domain_list) {
          if (domain.match(/\:/)) {
            rules.push(...this.join_file(domain));
          } else {
            rules.push(domain);
          }
        }
        break;
      case "full":
        rules.push(`^${filename[1]}`);
        break;
      case "regexp":
        break;
      default:
        rules.push(filename[1]);
    }

    return rules;
  }
}

const ruler = new OC_RULER();
ruler.write();
