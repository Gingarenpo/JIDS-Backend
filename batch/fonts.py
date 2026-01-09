import matplotlib.font_manager as fm
import matplotlib
import pprint

font_list = [f.name for f in fm.fontManager.ttflist]

print(matplotlib.get_cachedir())
pprint.pprint(sorted(font_list))