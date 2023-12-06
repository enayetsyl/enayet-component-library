HOSTING IMAGE


go to imagebb website ->
open dropdown beside about and click api ->
copy the api ->
go to vs code and open .local.env file ->
write VITE_Hosting_Key=paste the api here -> 
go to the component where you want to use the key ->
create a variable above component function as follows
const image_hosting_key = import.meta.env.VITE_Hosting_Key  ->
go to imagebb website in api tab ->
find out Example Call ->
copy the link -> 
go to vs code component and after earlier variable create another variable like follows

const image_hosting-api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


