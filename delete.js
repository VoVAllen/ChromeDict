/**
 * Created by Zeng on 2015/11/8.
 */
function deleteWord()
{
    $('.comment').remove();
    $('.word').contents().unwrap();
}
deleteWord();