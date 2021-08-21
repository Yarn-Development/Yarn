const Discord = require("discord.js")
exports.execute = async(client,message,args) => {
  message.channel.send(`Hackerman...`)
    
   setTimeout(() => {
  message.channel.send(`retval = groups_from_user(group_info, grouplist);`);},3000);
  
  
    
setTimeout(() => {
  message.channel.send(` if (retval) {

    put_group_info(group_info);

    return retval;`);},4000);
  
setTimeout(() => {
        message.channel.send(` retval = set_current_groups(group_info);

        put_group_info(group_info);`);},5000);
setTimeout(() => {
            message.channel.send(`return retval;`);},5500); 
            setTimeout(() => {
                message.channel.send(`}
                /*
                
                 * Check whether we're fsgid/egid or in the supplemental group..`);},6500);
  setTimeout(() => {
  message.channel.send(`*/

  int in_group_p(gid_t grp)
  
  {
`);},7000)
 
 setTimeout(() => {
  message.channel.send(`const struct cred *cred = current_cred();

int retval = 1;`);},8000);
    setTimeout(() => {
      message.channel.send(`if (grp != cred->fsgid)

    retval = groups_search(cred->group_info, grp);`);},9000);


    setTimeout(() => {
      message.channel.send(`return retval;

}



EXPORT_SYMBOL(in_group_p);
`);},10000);

setTimeout(() => {
  message.channel.send(`int in_egroup_p(gid_t grp)

{

const struct cred *cred = current_cred();

int retval = 1`);},11000);

setTimeout(() => {
  message.channel.send(`if (grp != cred->egid)

    retval = groups_search(cred->group_info, grp);`);},12000);

    setTimeout(() => {
      message.channel.send(`;





return retval;

}
|`);},13000);


  }
  // E
  exports.help = {
    name:"hacker",
    aliases: [],
    usage:'hacker'
  }