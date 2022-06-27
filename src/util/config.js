import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { addConfig, editConfig, getConfig, getConfigs } from "../services/Config";

export async function getAllConfigurations() {
  const {setCurrentTheme} = useContext(ThemeContext);
  const savedTheme = await getConfig({title: 'theme'})
  console.log(savedTheme)

}

export async function config() {
  const configurations = await getConfigs();

  if (configurations.length) {
    // console.log(configurations, 'all')  

  }
}

export async function configTheme(theme) {
  const config = {
    title: 'theme',
    configset: theme
  }
  const alreadySaved = await getConfig(config);
  if (alreadySaved.length) {
    await editConfig(config)
  } else {
    await addConfig(config)
  }
}
