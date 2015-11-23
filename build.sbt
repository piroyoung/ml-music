name := "MusicML"

version := "1.0"

lazy val `musicml` = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq( jdbc , cache , ws   , specs2 % Test )

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

resolvers += "Scalaz Bintray Repo" at "http://dl.bintray.com/scalaz/releases"