// @ts-ignore
import command from "child_process";

export class ConsoleCommandController {

  static getFirewallRules() {
    return command.execSync('ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand="ssh -o StrictHostKeyChecking=no -W %h:%p rango@13.53.227.95" rango@panel-1.dev.private.sas "sudo iptables -L -v"');
  }

  static disableNode(nodeName: string) {
    return command.execSync(`ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand="ssh -o StrictHostKeyChecking=no -W %h:%p rango@13.53.227.95" rango@${nodeName} "sudo iptables -A INPUT -p tcp --dport 32001 -j DROP && sudo iptables -A INPUT -p tcp --dport 22002 -j DROP"`);
  }

  static enableNode(nodeName: string) {
    return command.execSync(`ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand="ssh -o StrictHostKeyChecking=no -W %h:%p rango@13.53.227.95" rango@${nodeName} "sudo iptables -D INPUT -p tcp --dport 32001 -j DROP && sudo iptables -D INPUT -p tcp --dport 22002 -j DROP"`);
  }
}
