using LivestockTracker.Updater.Config;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace LivestockTracker.Updater.Windows.Config
{
  public class FtpConfig : IFtpConfig
  {
    private string _settingsPrefix;
    public FtpConfig()
    {
      _settingsPrefix = "ftp:";
      Configure();
    }

    public string Server { get; private set; }

    public string Username { get; private set; }

    public string Password { get; private set; }

    public void Configure()
    {
      var settings = ConfigurationManager.AppSettings.AllKeys.Select(k => new KeyValuePair<string, string>(k, ConfigurationManager.AppSettings[k]));
      var pairs = settings.Where(k => k.Key.StartsWith(_settingsPrefix))
                          .Select(k => new KeyValuePair<string, string>(k.Key.Substring(_settingsPrefix.Length), Environment.ExpandEnvironmentVariables(k.Value)));

      Server = pairs.FirstOrDefault(x => x.Key.ToLower() == nameof(Server).ToLower()).Value;
      Username = pairs.SingleOrDefault(x => x.Key.ToLower() == nameof(Username).ToLower()).Value;
      Password = pairs.SingleOrDefault(x => x.Key.ToLower() == nameof(Password).ToLower()).Value;
    }
  }
}
