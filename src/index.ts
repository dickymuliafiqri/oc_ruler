/**
 * by dickymuliafiqri
 * 
 * Convert v2fly geosite community file to openclash rule format
 */

import {readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync} from "fs"

const v2fly_dir = `${process.cwd()}/v2fly-geosite`;
const oc_ruler_dir = `${process.cwd()}/data`;

class OC_RULER {
    private domain_files = readdirSync("./v2fly-geosite/data")

    write() {
        console.log(`Generating rule...`)
        this.domain_files.forEach((domains) => {
            console.log(domains);
            const rules = ["payload:"]
            const domain_list = readFileSync(`${v2fly_dir}/data/${domains}`).toString().split(/\n/g);

            for (const i in domain_list) {
                if (domain_list[i].startsWith("include:")) {
                    rules.push(...this.join_file(domain_list[i]));
                    delete domain_list[i];
                }
            }

            for (const domain of domain_list) {
                if (!domain) {
                    continue
                } else if (domain.match(/(#|regexp)/)) {
                    continue
                } else if (domain.match(/\s@/)) {
                    rules.push(domain.split(" ").shift() as string)
                } else {
                    rules.push(domain)
                }
            }

            if (!existsSync(oc_ruler_dir)) mkdirSync(oc_ruler_dir);

            for (const i in rules) {
                if (parseInt(i) == 0) continue;

                if (rules[i].match(/\./)) {
                    rules.push(`\n  - DOMAIN-SUFFIX,${rules[i]}`)
                } else {
                    rules.push(`\n  - DOMAIN-KEYWORD,${rules[i]}`)
                }

                delete rules[i];
            }
            writeFileSync(`${oc_ruler_dir}/${domains}.yaml`, rules.join(""));
        })
        console.log("Done!")
    }

    join_file(filename: string) {
        filename.split(":");
        const rules: Array<string> = [];
        
        if (filename[0] == "include") {    
            const domain_list = readFileSync(`${v2fly_dir}/data/${filename[1]}`).toString().split(/\n/g);

            for (const domain of domain_list) {
                if (domain.startsWith("include")) {
                    rules.push(...this.join_file(domain))
                } else {
                    rules.push(domain);
                }
            }
        }

        return rules;
    }
}

const ruler = new OC_RULER();
ruler.write();